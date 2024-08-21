import fetchReviewByEvaluationId from '@/app/lib/data';
import ClassReviewList from '@/app/ui/universities/class-list';
import DeleteReviewForm from '@/app/ui/universities/delete-review-form';
import NotAllowed from '@/app/ui/universities/not-allowed';
import { auth } from '@@/auth';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { evaluationId: string; id: string };
}) {
  const review = await fetchReviewByEvaluationId(parseInt(params.evaluationId));
  const formattedReview = {
    query: review?.className,
  };
  const session = await auth();

  if (!review) {
    notFound();
  }

  if (session?.user?.email !== review?.createdBy) {
    return <NotAllowed />;
  }
  return (
    <div className="relative">
      <div className="pointer-events-none relative">
        <ClassReviewList params={params} searchParams={formattedReview} />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <DeleteReviewForm
          evaluationId={params.evaluationId}
          id={params.id}
          searchParams={formattedReview}
        />
      </div>
    </div>
  );
}
