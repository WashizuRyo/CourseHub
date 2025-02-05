'use server';

import { auth, signIn, signOut } from '@@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from './prisma';

export type State = {
  errors?: {
    className?: string[];
    title?: string[];
    star?: string[];
    evaluation?: string[];
    who?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  faculty: z.enum(['理学部', '工学部', '文学部', '経済部'], {
    invalid_type_error: '学部を選択してください',
  }),
  className: z
    .string({
      invalid_type_error: '有効な授業名を入力してください',
    })
    .min(1, { message: '授業名は１文字以上でなければなりません' })
    .max(31, { message: 'タイトルは31文字以下でなければなりません' }),
  title: z
    .string({ invalid_type_error: '有効なタイトルを入力してください' })
    .min(1, { message: 'タイトルは1文字以上でなければなりません' })
    .max(31, { message: 'タイトルは31文字以下でなければなりません' }),
  star: z.coerce.number().min(1, { message: '総合評価を選択してください' }),
  evaluation: z
    .string({
      invalid_type_error: '有効な授業評価を入力してください',
    })
    .min(20, { message: '授業評価は20文字以上でなければなりません' })
    .max(511, { message: '授業評価は511文字以下でなければなりません' }),
  date: z.string(),
  universityId: z.coerce.number(),
  who: z.enum(['username', 'anonymous'], {
    invalid_type_error: '投稿者名を選択してください。',
  }),
  userId: z.string({ invalid_type_error: 'ユーザIDが不正です' }),
});

const CreateAndUpdateReview = FormSchema.omit({
  id: true,
  date: true,
  universityId: true,
});

export async function createReview(universityId: number, prevState: State, formData: FormData) {
  const validatedFields = CreateAndUpdateReview.safeParse({
    faculty: formData.get('faculty'),
    className: formData.get('className'),
    title: formData.get('title'),
    star: formData.get('star'),
    evaluation: formData.get('evaluation'),
    who: formData.get('who'),
    userId: formData.get('userId'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '入力された値が正しくないです。レビュー作成に失敗しました。',
    };
  }

  const { className, evaluation, title, star, who, userId, faculty } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  const data = {
    date,
    faculty,
    className,
    title,
    star,
    evaluation,
    universityId,
    createdBy: userId,
    isAnonymous: who === 'anonymous',
  };
  try {
    await prisma.reviews.create({
      data,
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Review',
    };
  }

  revalidatePath(`/universities/${universityId}?classname=${encodeURIComponent(className)}`);
  redirect(`/universities/${universityId}?classname=${encodeURIComponent(className)}`);
}

export async function updateReview(
  evaluationId: number,
  universityId: number,
  accessPath: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateAndUpdateReview.safeParse({
    faculty: formData.get('faculty'),
    className: formData.get('className'),
    title: formData.get('title'),
    star: formData.get('star'),
    evaluation: formData.get('evaluation'),
    who: formData.get('who'),
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '入力された値が正しくないです。レビュー作成に失敗しました。',
    };
  }

  const { faculty, className, evaluation, who, star, title, userId } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  const newData = {
    faculty,
    date,
    className,
    title,
    star,
    evaluation,
    universityId,
    createdBy: userId,
    isAnonymous: who === 'anonymous',
  };
  try {
    await prisma.reviews.upsert({
      where: { id: evaluationId },
      update: newData,
      create: newData,
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Update Review',
    };
  }

  revalidatePath(`/universities/${universityId}?classname=${encodeURIComponent(className)}`);
  redirect(`/universities/${universityId}?classname=${encodeURIComponent(className)}`);
}

export async function deleteReview(evaluationId: number, id: number, query: string, accessPath: string) {
  const session = await auth();
  try {
    await prisma.reviews.delete({
      where: { id: evaluationId },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Database Error: Failed to Delete Review');
  }

  // accessPathが/universities/[一文字以上の任意の数字]の場合/universities/${id}?classname=${classname}に
  // リダイレクトする(大学名検索欄から閲覧し削除した時)
  // それ以外の場合はaccessPathにリダイレクトする(userページから削除した時)
  const regix = new RegExp('^/universities/\\d+$');

  if (regix.test(accessPath)) {
    revalidatePath(`/universities/${id}?classname=${encodeURIComponent(query)}`);
    redirect(`/universities/${id}?classname=${encodeURIComponent(query)}`);
  } else {
    revalidatePath(`/users/${session?.user?.id}/likes`);
    redirect(`/users/${session?.user?.id}/likes`);
  }
}

export async function fetchLikes(reviewId: number, userId: string, state: boolean) {
  if (!state) {
    try {
      await prisma.likes.delete({
        where: { reviewId_userId: { reviewId, userId } },
      });
    } catch (error) {
      console.error('Database Error', error);
      throw new Error('Failed to fetch likes');
    }
    return;
  }

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

export async function singOut() {
  await signOut();
}

export async function singIn() {
  await signIn();
}
