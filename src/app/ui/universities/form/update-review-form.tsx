'use client';

import { updateReview } from '@/app/lib/actions';
import type { Review } from '@/app/lib/definitions';
import Breadcrumb from '@/app/ui/breadcrumb/breadcrumb';
import Submit from '@/app/ui/universities/submit';
import { StarIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { notFound, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export default function UpdateReview({
  review,
  universityId,
}: {
  review: Review;
  universityId: string;
}) {
  const { data: session } = useSession();
  const accessPath = usePathname();

  const createReviewWithUniversityId = updateReview.bind(
    null,
    review.id,
    review.universityId,
    accessPath,
  );

  const initialState = {
    errors: {},
    message: '',
  };

  const [state, formAction] = useFormState(
    createReviewWithUniversityId,
    initialState,
  );

  if (!review) {
    notFound();
  }

  const [rating, setRating] = useState(review.star);

  const onClickHandler = (value: number) => {
    setRating(value);
  };
  const stars = [1, 2, 3, 4, 5];

  return (
    <form action={formAction}>
      <div className="m-4 mt-8">
        <Breadcrumb
          breadcrumbs={[
            { label: '大学名検索', href: '/' },
            {
              label: '講義名検索',
              href: `/university/${universityId}`,
            },
            {
              label: 'レビュー編集',
              href: `/university/${universityId}/edit/${review.id}`,
              active: true,
            },
          ]}
        />
      </div>
      <div className="flex justify-center p-4 md:m-auto md:w-7/12">
        <div className="flex w-full flex-col gap-4 rounded-md bg-gray-100 p-4">
          {/* 学部選択フィールド */}
          <div className="flex flex-col gap-2">
            <label htmlFor="faculty">学部を選択してください</label>
            <select
              id="faculty"
              name="faculty"
              className="p-2"
              defaultValue={review.faculty}
            >
              <option value="">学部を選んでください</option>
              <option value="理学部">理学部</option>
              <option value="工学部">工学部</option>
              <option value="文学部">文学部</option>
              <option value="経済部">経済部</option>
            </select>
            <div id="className-error" aria-live="polite" aria-atomic="true">
              {state.errors?.faculty &&
                state.errors.faculty.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* 授業名フィールド */}
          <div>
            <div className="space-y-2">
              <label htmlFor="className">授業名を入力してください</label>
              <input
                name="className"
                id="className"
                type="text"
                placeholder="授業名を入力"
                aria-describedby="className-error"
                defaultValue={review.className}
                className="w-full rounded border border-gray-200 p-2"
              ></input>
            </div>
            <div id="className-error" aria-live="polite" aria-atomic="true">
              {state.errors?.className &&
                state.errors.className.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* レビュータイトルフィールド */}
          <div>
            <div className="space-y-2">
              <label htmlFor="title">レビュータイトルを入力してください</label>
              <input
                name="title"
                id="title"
                type="text"
                placeholder="タイトルを入力"
                aria-describedby="className-error"
                defaultValue={review.title}
                className="w-full rounded border border-gray-200 p-2"
              ></input>
            </div>
            <div id="className-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* 総合評価フィールド */}
          <div>
            <p className="mb-1">総合評価</p>
            <div className="flex ">
              {stars.map((value, element) => (
                <div
                  key={element}
                  onClick={() => onClickHandler(value)}
                  className="hover: cursor-pointer"
                >
                  {element >= rating ? (
                    <StarIcon className="size-12" />
                  ) : (
                    <StarIcon className="size-12 text-yellow-400" />
                  )}
                </div>
              ))}
            </div>
            <input type="hidden" value={rating} name="star" id="star"></input>
            <div id="className-error" aria-live="polite" aria-atomic="true">
              {state.errors?.star &&
                state.errors.star.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* 授業レビューフィールド */}
          <div>
            <div className="space-y-2">
              <label htmlFor="evaluation">授業レビューを入力してください</label>
              <textarea
                name="evaluation"
                id="evaluation"
                placeholder="授業レビューを入力"
                defaultValue={review.evaluation}
                className="block h-[160px] w-full resize-y rounded border border-gray-200 p-2"
              />
            </div>
            <div id="evaluation-error" aria-live="polite" aria-atomic="true">
              {state.errors?.evaluation &&
                state.errors.evaluation.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* 投稿者名フィールド */}
          <div>
            <p>投稿者名を選択してください</p>
            <div className="mt-2 flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-4">
              <div>
                <input
                  id="anonymous"
                  type="radio"
                  name="who"
                  value="anonymous"
                  defaultChecked
                />
                <label
                  htmlFor="anonymous"
                  className="ml-2 rounded-3xl bg-gray-100 p-2 px-4 text-sm"
                >
                  匿名で投稿
                </label>
              </div>
              <div>
                <input id="username" type="radio" name="who" value="username" />
                <label
                  htmlFor="username"
                  className="ml-2 rounded-3xl bg-green-500 p-2 px-4 text-sm text-white"
                >
                  {session!.user!.name}で投稿
                </label>
              </div>
            </div>
            <input
              type="hidden"
              value={session!.user!.id}
              name="userId"
              id="userId"
            />

            <div id="who-error" aria-live="polite" aria-atomic="true">
              {state.errors?.who &&
                state.errors.who.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-2 flex justify-center gap-2">
        <Link
          href={`/university/${universityId}?query=${review.className}`}
          className="
          rounded-xl
          bg-gray-100
          p-3
          hover:bg-gray-200"
        >
          キャンセル
        </Link>
        <Submit />
      </div>
    </form>
  );
}
