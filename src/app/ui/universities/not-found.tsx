import { XCircleIcon } from '@heroicons/react/24/outline';

const NotFound = ({ query, faculty }: { query: string; faculty: string }) => {
  if (faculty) {
    return (
      <div>
        <div className="mb-4 flex justify-center">
          <XCircleIcon className="size-10 text-gray-200" />
        </div>
        <p className="text-center text-xl">
          選択された学部のレビューはまだありません。
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <XCircleIcon className="size-10 text-gray-200" />
      </div>
      <p className="text-center text-xl">
        見つかりませんでした：&quot;<b>{query}</b>&quot;
      </p>
    </div>
  );
};

export default NotFound;
