import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismaClient"
import dayjs from "dayjs"
import { Prisma } from "@prisma/client"
import { CategoryStat, CategoryStatData, Transaction } from "@/types"

interface GroupedData {
  [key: string]: Transaction[]
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId, userId } = getAuth(req)

  if (!sessionId) {
    return res.status(401).json({ id: null })
  }

  const { date_from, date_to, account_id, category } = req.query

  const transactions = await prisma.transactions.findMany({
    where: {
      userId: userId,
      accountId: (account_id as string) || undefined,
      category: (category as string) || undefined,
      date: {
        gte: date_from
          ? new Date(date_from as string)
          : new Date(dayjs().format("YYYY-MM-01")),
        lte: date_to ? new Date(date_to as string) : new Date(),
      },
    },
    orderBy: {
      date: "desc",
    },
  })

  res.status(200).json(transactions)
}
