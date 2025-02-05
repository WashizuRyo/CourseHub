import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  href: string;
};

export const EditLink = ({ href }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <Link href={href}>
        <div className="rounded-md border border-green-400 p-2 shadow-sm hover:bg-gray-100">
          <PencilSquareIcon className="size-5 text-green-400" />
        </div>
      </Link>
      <span className="mt-1 text-sm">編集</span>
    </div>
  );
};
