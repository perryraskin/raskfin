import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismaClient"
import dayjs from "dayjs"

interface IMerchantsRequest {
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
        req.body as IMerchantsRequest

      const typeSql = includePayments ? "z" : "payment"
      const dateFromSql = dateFrom
        ? new Date(dateFrom)
        : new Date(dayjs().format("YYYY-MM-01"))
      const dateToSql = dateTo ? new Date(dateTo) : new Date()

      const accounts = await prisma.accounts.findMany({
        where: {
          userId,
        },
      })
      const accountIdList = accounts.map((acc) => acc.id)
      const accountIdSql = accountId
        ? accountId.join(",")
        : accountIdList.join(",")

      const merchants = await prisma.$queryRaw`
        SELECT
          m.name AS merchant,
          SUM(t.price) AS "totalSpent"
        FROM
          merchants m
        JOIN
          transactions t ON m.id = t.merchant_id
        WHERE
          t.user_id = ${userId}
          AND t.type != ${typeSql}
          AND t.date >= ${dateFromSql}
          AND t.date <= ${dateToSql}

        GROUP BY
          m.name
        ORDER BY
          "totalSpent" DESC;
      `

      return res.status(200).json(merchants)
    default:
      return res.status(405).json({ message: "Method not allowed" })
  }
}
