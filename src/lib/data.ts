import { prisma } from './prisma'

export async function fetchUniversityByName(universityName: string) {
  try {
    const data = await prisma.university.findUnique({
      where: { universityname: universityName },
    })
    return data
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to fetch university')
  }
}
