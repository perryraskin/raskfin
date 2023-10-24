import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismaClient"
import { SignupBonus } from "@/types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId, userId } = getAuth(req)

  if (!sessionId) {
    return res.status(401).json({ id: null })
  }

  switch (req.method) {
    case "GET":
      const signupBonuses = await prisma.signup_bonuses.findMany({
        where: {
          Account: {
            userId,
          },
        },
        include: {
          Account: true,
        },
      })

      const matchingTransactions = await prisma.transactions.findMany({
        where: {
          accountId: {
            in: signupBonuses.map((sb) => sb.accountId || ""),
          },
        },
      })

      const signupBonusesWithCurrentSpend: SignupBonus[] = []
      signupBonuses.forEach((signupBonus) => {
        let currentSpend = 0.0
        const transactions = matchingTransactions.filter(
          (t) => t.accountId === signupBonus.accountId && t.type !== "payment"
          // &&
          // t.status === "posted"
        )
        transactions.forEach((t) => {
          currentSpend += +t.price
        })
        signupBonusesWithCurrentSpend.push({
          id: signupBonus.id,
          dateCreated: signupBonus.dateCreated,
          dateUpdated: signupBonus.dateUpdated,
          Account: {
            id: signupBonus.Account?.id || "",
            name: signupBonus.Account?.name || "",
            lastFour: signupBonus.Account?.lastFour || "",
            institutionName: signupBonus.Account?.institutionName || "",
          },
          minSpend: +signupBonus.minSpend,
          currentSpend,
          spendByDate: signupBonus.spendByDate,
        })
      })

      return res.status(200).json(signupBonusesWithCurrentSpend)
    default:
      return res.status(405).json({ message: "Method not allowed" })
  }
}
