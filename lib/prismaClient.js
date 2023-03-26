import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient({ log: ["query"] })
// declare global {
//   var prisma: PrismaClient | undefined
// }

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.prisma = prisma

export default prisma
