import fetchReviewByEvaluationId from '@/app/lib/data';
import NotAllowed from '@/app/ui/universities/not-allowed';
import UpdateReview from '@/app/ui/universities/update-review-form';
import { auth } from '@@/auth';
import { SessionProvider } from 'next-auth/react';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { evaluationId: string; id: string };
}) {
  const review = await fetchReviewByEvaluationId(parseInt(params.evaluationId));
  const session = await auth();
  if (!review) {
    notFound();
  }

  if (session?.user?.email !== review?.createdBy) {
    return <NotAllowed />;
  }

  return (
    <div>
      <SessionProvider session={session}>
        <UpdateReview review={review} universityId={params.id} />
      </SessionProvider>
    </div>
  );
}
