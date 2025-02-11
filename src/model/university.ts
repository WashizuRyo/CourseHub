import { prisma } from '@/lib/prisma'

export async function fetchUniversity(id: number) {
  try {
    const data = await prisma.university.findUnique({
      where: { universityId: id },
    })
    return data
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to fetch university')
  }
}
