import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismaClient"
import dayjs from "dayjs"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId, userId } = getAuth(req)

  if (!sessionId) {
    return res.status(401).json({ id: null })
  }

  const uniqueCategories = await prisma.transactions.groupBy({
    by: ["category"],
    where: {
      userId: userId,
      category: {
        not: null,
      },
    },
    orderBy: {
      category: "asc",
    },
  })

  const categories = uniqueCategories.map((item) => item.category)

  res.status(200).json(categories)
}
