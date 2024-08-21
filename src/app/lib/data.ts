import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['query'] });
const id = 1;
export async function fetchTanaka() {
  // try {
  //   const data = await prisma.tanaka.findMany({ where: { id } });
  //   return data;
  // } catch (error) {
  //   console.error('Database Error', error);
  //   throw new Error('Failed to fetch tanaka');
  // }
}
