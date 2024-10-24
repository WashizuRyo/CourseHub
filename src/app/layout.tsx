import '@/app/ui/global.css';
import { auth } from '@@/auth';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import { inter, lusitana } from './ui/fonts';
import UserAvatar from './ui/universities/user-avatar/user-avatar';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // セッションを取得
  const session = await auth();
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased`}>
        <div className="flex justify-between bg-slate-100 shadow">
          {/* ロゴ */}
          <Link href="/" className="ml-2 flex items-center">
            <div className={`${lusitana.className} flex items-center`}>
              <AcademicCapIcon className="size-12" />
              <p className="ml-3 text-3xl">CourseHub</p>
            </div>
          </Link>
          <UserAvatar session={session} />
        </div>
        {/* Client Componentでもセッションを取得できるように */}
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
