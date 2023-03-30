import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismaClient"
import dayjs from "dayjs"
import { Transaction } from "@/types"

interface TransactionQuery {
  id?: string
}

interface TransactionRequest {
  name?: string
  notes?: string
  status?: string
  type?: string
  price: string
  category?: string
  date?: Date
  tellerTxnId?: string
  accountId: string
  dateCreated?: Date
  dateUpdated?: Date
  userId?: string
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
    case "PATCH":
      const { id } = req.query as TransactionQuery

      const transaction = await prisma.transactions.findUnique({
        where: {
          id,
        },
      })

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" })
      }
      //
      else if (transaction.userId !== userId) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const { name, price, category, date } = req.body as TransactionRequest

      const updatedTransaction = await prisma.transactions.update({
        where: {
          id,
        },
        data: {
          name: name || undefined,
          price: price ? parseFloat(price) : undefined,
          category: category || undefined,
          date: date ? new Date(date) : undefined,
        },
      })
      return res.status(200).json(updatedTransaction)
    default:
      return res.status(405).json({ message: "Method not allowed" })
  }
}
