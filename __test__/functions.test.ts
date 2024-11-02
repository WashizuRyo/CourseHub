import {
  DEFAULT_CLASS_NAME,
  DEFAULT_FACULTY_NAME,
  DEFAULT_SORT,
} from '@/app/lib/constants';
import type { Review } from '@/app/lib/definitions';
import {
  getAddedIsLikedFieldToReviews,
  getQueryParams,
  getTotalPage,
} from '@/app/lib/functions';
import type { Session } from 'next-auth';

describe('getTotalPage', () => {
  test('引数がPAGE_SIZEで割り切れるとき、商を返す', () => {
    expect(getTotalPage(5)).toBe(1);
    expect(getTotalPage(10)).toBe(2);
    expect(getTotalPage(15)).toBe(3);
  });
  test('引数がPAGE_SIZEで割り切れない時、商の小数点以下切り捨てた値に1を足した数を返す', () => {
    expect(getTotalPage(3)).toBe(1);
    expect(getTotalPage(6)).toBe(2);
    expect(getTotalPage(11)).toBe(3);
  });
  test('引数が0以下だったら0を返す', () => {
    expect(getTotalPage(0)).toBe(0);
    expect(getTotalPage(-5)).toBe(0);
  });
  test('境界値: pageNumber = 0; pageNumber = 1', () => {
    expect(getTotalPage(0)).toBe(0);
    expect(getTotalPage(1)).toBe(1);
  });
});

describe('getAddedIsLikedFieldToReviews', () => {
  const testSession: Session = {
    user: {
      id: '1',
      name: 'testName',
      email: 'test@test.com',
      image: 'test.com',
    },
    expires: '2024-11-02T12:34:56.789Z',
  };
  const testReview1: Review = {
    faculty: 'Computer Science',
    id: 1,
    date: '2024-10-27',
    title: 'test',
    star: 3,
    createdBy: 'test',
    className: 'test',
    isAnonymous: false,
    evaluation: 'test',
    universityId: 1,
    user: {
      name: 'test',
      image: 'test.com',
    },
  };
  const testReview2: Review = {
    faculty: 'Computer Science',
    id: 2,
    date: '2024-10-28',
    title: 'test',
    star: 3,
    createdBy: 'test2',
    className: 'test',
    isAnonymous: false,
    evaluation: 'test',
    universityId: 1,
    user: {
      name: 'test2',
      image: 'test.com',
    },
  };
  test('Reviewの配列を渡すとフィールドにisLiked: trueのReviewWithLikes[]が返ってくる', () => {
    const testReview: Review[] = [testReview1, testReview2];
    expect(getAddedIsLikedFieldToReviews(testReview, testSession)).toEqual([
      { ...testReview1, isLiked: false },
      { ...testReview2, isLiked: false },
    ]);
  });
  test('Reviewにいいねしたセッションを渡すとフィールドにisLiked: trueのReviewWithLikes[]が返ってくる', () => {
    // testReview1にlikesフィールドを追加してtestSessionのデータを挿入
    const addLikesField = {
      ...testReview1,
      likes: [{ id: 1, reviewId: 1, userId: '1' }],
    };
    const testReview: Review[] = [addLikesField];

    expect(getAddedIsLikedFieldToReviews(testReview, testSession)).toEqual([
      { ...addLikesField, isLiked: true },
    ]);
  });
  test('sessionがnullの場合フィールドにisLiked: falseのReviewWithLikes[]が返ってくる', () => {
    expect(getAddedIsLikedFieldToReviews([testReview1], null)).toEqual([
      { ...testReview1, isLiked: false },
    ]);
  });
});

describe('getQueryParams', () => {
  test('searchParmasを渡して、それぞれのパラメータが返ってくる', () => {
    const searchParams = {
      classname: 'test',
      page: '1',
      sort: 'asc' as const,
      faculty: 'Computer Science',
    };

    expect(getQueryParams(searchParams)).toEqual({
      className: 'test',
      currentPage: 1,
      sort: 'asc',
      faculty: 'Computer Science',
    });
  });
  test('パラメータがないsearchParmasを渡した時、デフォルトのパラメータが返ってくる', () => {
    const searchParams = { page: '1' };

    expect(getQueryParams(searchParams)).toEqual({
      className: DEFAULT_CLASS_NAME,
      currentPage: 1,
      sort: DEFAULT_SORT,
      faculty: DEFAULT_FACULTY_NAME,
    });
  });
});
