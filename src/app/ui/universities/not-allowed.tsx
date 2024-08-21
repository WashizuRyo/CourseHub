import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function NotAllowed() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">403 Forbidden</h2>
      <p>アクセス権がありません</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        ホームへ
      </Link>
    </main>
  );
}
