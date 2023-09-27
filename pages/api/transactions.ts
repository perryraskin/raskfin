import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismaClient"
import dayjs from "dayjs"

interface ITransactionsRequest {
  includePayments?: boolean
  dateFrom?: string
  dateTo?: string
  accountId?: string[]
  category?: string[]
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId, userId } = getAuth(req)

  if (!sessionId) {
    return res.status(401).json({ id: null })
  }

  switch (req.method) {
    case "POST":
      const { includePayments, dateFrom, dateTo, accountId, category } =
        req.body as ITransactionsRequest

      const transactions = await prisma.transactions.findMany({
        where: {
          userId: userId,
          type: includePayments ? undefined : { not: "payment" },
          accountId: {
            in:
              (accountId && accountId.length === 0) || !accountId
                ? undefined
                : accountId,
          },
          category: {
            in:
              (category && category.length === 0) || !category
                ? undefined
                : category,
          },
          date: {
            gte: dateFrom
              ? new Date(dateFrom)
              : new Date(dayjs().format("YYYY-MM-01")),
            lte: dateTo ? new Date(dateTo) : new Date(),
          },
        },
        orderBy: [
          {
            status: "asc",
          },
          {
            date: "desc",
          },
          {
            dateCreated: "desc",
          },
        ],
        include: {
          Account: true,
        },
      })

      return res.status(200).json(transactions)
    default:
      return res.status(405).json({ message: "Method not allowed" })
  }
}
