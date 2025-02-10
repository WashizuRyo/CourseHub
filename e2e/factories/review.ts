import { prisma } from '@/lib/prisma'
import { sequence } from '@@/e2e/factories/commom'
import type { Reviews } from '@prisma/client'

export const buildReview = (options: Partial<Reviews> = {}): Reviews => {
  const id = sequence('review')
  return {
    id,
    className: `Test Review${id}`,
    faculty: `Test Faculty${id}`,
    star: 3,
    title: `Test Title${id}`,
    evaluation: `Test Evaluation${id}`,
    date: '2024/01/01',
    universityId: 1,
    createdBy: 'dummy',
    isAnonymous: false,
    ...options,
  }
}

export async function createReview(data: Reviews) {
  try {
    return await prisma.reviews.create({ data })
  } catch (error) {
    console.error('Database Error', error)
    throw new Error('Failed to create review')
  }
}
