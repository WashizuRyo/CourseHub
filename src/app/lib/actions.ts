'use server';

import { signIn, signOut } from '@@/auth';
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
  userId: z.string(),
});

const CreateAndUpdateReview = FormSchema.omit({
  id: true,
  date: true,
  universityId: true,
});

export async function createReview(
  universityId: number,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateAndUpdateReview.safeParse({
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

  const { className, evaluation, title, star, who, userId } =
    validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  const data = {
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
    await prisma.reviews.create({
      data,
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Review',
    };
  }

  revalidatePath(`/university/${universityId}?query=${className}`);
  redirect(`/university/${universityId}?query=${className}`);
}

export async function updateReview(
  evaluationId: number,
  universityId: number,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateAndUpdateReview.safeParse({
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

  const { className, evaluation, who, star, title, userId } =
    validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  const newData = {
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

  revalidatePath(`/university/${universityId}?query=${className}`);
  redirect(`/university/${universityId}?query=${className}`);
}

export async function deleteReview(
  evaluationId: number,
  id: number,
  query: string | undefined,
) {
  try {
    await prisma.reviews.delete({
      where: { id: evaluationId },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Delete Review',
    };
  }

  revalidatePath(`/university/${id}?query=${query}`);
  redirect(`/university/${id}?query=${query}`);
}

export async function singOut() {
  await signOut();
}

export async function singIn() {
  await signIn();
}
