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

export async function fetchReviewsByClass(className: string, page: number) {
  const pageSize = 2;
  console.log(page);
  try {
    const data = await prisma.reviews.findMany({
      skip: pageSize * (Number(page) - 1),
      take: pageSize,
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

export async function fetchTotalPage(query: string) {
  const pageSize = 2;
  try {
    let totalPage = await prisma.reviews.count({ where: { className: query } });
    if (totalPage % 2 == 0) {
      totalPage /= 2;
    } else {
      totalPage = Math.floor(totalPage / pageSize) + 1;
    }
    return totalPage;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch totalPage');
  }
}
