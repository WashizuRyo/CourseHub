import { prisma } from '@/lib/prisma'
import { sequence } from '@@/e2e/factories/commom'
import type { University } from '@prisma/client'

export const buildUniversity = (options: Partial<University> = {}): University => {
  const id = sequence('university')
  return {
    universityId: id,
    universityname: `Test University${id}`,
    date: '2024/01/01',
    ...options,
  }
}

export async function createUniversity(data: University) {
  try {
    return await prisma.university.create({ data })
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to create university')
  }
}
