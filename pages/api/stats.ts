import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismaClient"
import dayjs from "dayjs"
import { Prisma } from "@prisma/client"
import {
  CategoryStat,
  CategoryStatData,
  StatsMonthsResponse,
  Transaction,
} from "@/types"

declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString()
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId, userId } = getAuth(req)

  if (!sessionId) {
    return res.status(401).json({ id: null })
  }

  console.log(req.query)
  const { includePending } = req.query
  const transactionStatus =
    includePending === "true" ? ["pending", "posted"] : ["posted", "-"]

  const today = dayjs()
  const threeMonthsAgoStart = today.subtract(3, "month").startOf("month")
  const twoMonthsAgoStart = today.subtract(2, "month").startOf("month")
  const oneMonthAgoStart = today.subtract(1, "month").startOf("month")
  const thisMonthStart = today.startOf("month")

  const months: StatsMonthsResponse[] = await prisma.$queryRaw`
  SELECT
    TO_CHAR(date, 'YYYY-MM') AS month,
    category AS category,
    COUNT(*) AS count,
    SUM(price) AS total_amount
  FROM
    transactions t
  WHERE 
    t.user_id = ${userId}
    AND t.date >= ${threeMonthsAgoStart.toDate()}
    AND t.type != 'payment'
    AND (t.status = ${transactionStatus[0]} OR t.status = ${
    transactionStatus[1]
  })
  GROUP BY
    month,
    category
  ORDER BY
    month,
    total_amount DESC;`

  res.status(200).json({
    months: [
      {
        date: threeMonthsAgoStart.toDate(),
        name: threeMonthsAgoStart.format("MMMM YYYY"),
        dataList: months
          .filter((m) => m.month === threeMonthsAgoStart.format("YYYY-MM"))
          .map((m) => ({
            name: m.category,
            numTransactions: parseInt(m.count),
            amount: parseFloat(m.total_amount),
          })),
      },
      {
        date: twoMonthsAgoStart.toDate(),
        name: twoMonthsAgoStart.format("MMMM YYYY"),
        dataList: months
          .filter((m) => m.month === twoMonthsAgoStart.format("YYYY-MM"))
          .map((m) => ({
            name: m.category,
            numTransactions: parseInt(m.count),
            amount: parseFloat(m.total_amount),
          })),
      },
      {
        date: oneMonthAgoStart.toDate(),
        name: oneMonthAgoStart.format("MMMM YYYY"),
        dataList: months
          .filter((m) => m.month === oneMonthAgoStart.format("YYYY-MM"))
          .map((m) => ({
            name: m.category,
            numTransactions: parseInt(m.count),
            amount: parseFloat(m.total_amount),
          })),
      },
      {
        date: thisMonthStart.toDate(),
        name: thisMonthStart.format("MMMM YYYY"),
        dataList: months
          .filter((m) => m.month === thisMonthStart.format("YYYY-MM"))
          .map((m) => ({
            name: m.category,
            numTransactions: parseInt(m.count),
            amount: parseFloat(m.total_amount),
          })),
      },
    ],
  })
}
