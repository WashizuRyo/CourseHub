import { fetchUniversityByUniversityId } from '@/app/lib/data';
import ClassList from '@/app/ui/universities/class-list';
import { notFound } from 'next/navigation';

export default async function Reviews({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { query?: string };
}) {
  const university = await fetchUniversityByUniversityId(parseInt(params.id));

  if (!university) {
    notFound();
  }

  return (
    <div>
      <ClassList params={params} searchParams={searchParams} />
    </div>
  );
}
