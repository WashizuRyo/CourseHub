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

export async function fetchUniversityByName(universityName: string) {
  try {
    const data = await prisma.university.findUnique({
      where: { universityname: universityName },
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

export async function fetchReviewsByClass(
  className: string,
  page: number,
  sort: 'asc' | 'desc',
  faculty: string,
) {
  const pageSize = 5;

  try {
    const data = await prisma.reviews.findMany({
      skip: pageSize * (page - 1),
      take: pageSize,
      where: faculty ? { faculty } : { className },
      orderBy: { date: sort },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            likes: true,
          },
        },
        likes: true,
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

export async function fetchTotalPage(query: string, faculty: string) {
  const pageSize = 5;
  try {
    let totalPage = await prisma.reviews.count({
      where: faculty ? { faculty } : { className: query },
    });
    if (totalPage % 5 == 0) {
      totalPage /= 5;
    } else {
      totalPage = Math.floor(totalPage / pageSize) + 1;
    }
    return totalPage;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch totalPage');
  }
}

export async function fetchLikeByReviewIdAndUserId(
  reviewId: number,
  userId: string,
) {
  try {
    const data = await prisma.likes.findUnique({
      where: { reviewId_userId: { reviewId, userId } },
    });
    return data;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch like');
  }
}

export async function createReviews(date: string, createdBy: string) {
  try {
    const data = await prisma.reviews.create({
      data: {
        date,
        className: 'test',
        title: 'test',
        star: 5,
        evaluation: 'test',
        universityId: 1,
        createdBy,
        faculty: '理学部',
        isAnonymous: false,
      },
    });
    return data;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to create reviews');
  }
}

export async function deleteReviews(faculty: string) {
  try {
    const data = await prisma.reviews.deleteMany({
      where: { faculty },
    });
    return data;
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to delete reviews');
  }
}

export async function createLikes(reviewId: number) {
  const userId = process.env.TEST_ID!;
  try {
    await prisma.likes.upsert({
      where: { reviewId_userId: { reviewId, userId } },
      update: { reviewId, userId },
      create: { reviewId, userId },
    });
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch likes');
  }
}

export async function fetchReviewId(date: string) {
  try {
    const data = await prisma.reviews.findFirst({
      where: { date },
    });
    return data?.id || '';
  } catch (error) {
    console.error('Database Error', error);
    throw new Error('Failed to fetch reviewId');
  }
}
