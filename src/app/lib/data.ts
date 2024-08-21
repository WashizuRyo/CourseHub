import { prisma } from './prisma';

export async function fetchReviews(className: string) {
  try {
    const data = await prisma.reviews.findMany({
      where: { className },
    });
    return data;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch reviews');
  }
}

export async function fetchUniversity(query: string) {
  try {
    const data = await prisma.university.findUnique({
      where: { universityname: query },
    });
    return data;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch university');
  }
}

export async function fetchUniversityByUniversityId(id: number) {
  try {
    const data = await prisma.university.findUnique({
      where: { universityId: id },
    });
    return data;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch university');
  }
}

export async function fetchReviewsByUniversityId(universityId: number) {
  try {
    const data = await prisma.reviews.findMany({
      where: { universityId },
    });
    return data;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch reviews');
  }
}

export async function fetchReviewsByClass(className: string) {
  try {
    const data = await prisma.reviews.findMany({
      where: { className },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch reviews');
  }
}

export default async function fetchReviewByEvaluationId(evaluationId: number) {
  try {
    const data = await prisma.reviews.findUnique({
      where: { id: evaluationId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch review');
  }
}
