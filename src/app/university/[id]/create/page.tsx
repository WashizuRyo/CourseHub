import Form from '@/app/ui/universities/create-review-form';
import { auth } from '@@/auth';
import { SessionProvider } from 'next-auth/react';

export default async function Page({ params }: { params: { id: string } }) {
  const universityId = params.id;
  const session = await auth();
  if (!session) {
    return <p className="mt-4 text-center text-2xl">ログインしてください</p>;
  }

  return (
    <main>
      <SessionProvider session={session}>
        <Form universityId={universityId} />
      </SessionProvider>
    </main>
  );
}
