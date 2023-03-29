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

  const accounts = await prisma.accounts.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      name: "asc",
    },
  })

  res.status(200).json(accounts)
}
