import { prisma } from '@/lib/prisma'

export async function fetchUniversity(universityId: number) {
  try {
    const data = await prisma.university.findUnique({
      where: { universityId },
    })
    return data
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to fetch university')
  }
}

export async function fetchUniversityByName(universityname: string) {
  try {
    return await prisma.university.findUnique({
      where: { universityname },
    })
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to fetch university')
  }
}
