import { PrismaClient } from "../../generated/prisma/index"


const prisma = new PrismaClient();
console.log("Connced to PostgreSQL using prisma");

export default prisma;
