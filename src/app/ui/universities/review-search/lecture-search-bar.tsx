import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function LectureSearchBar({
  className,
  setClassName,
  changeClassNameHandler,
}: {
  className: string;
  setClassName: React.Dispatch<React.SetStateAction<string>>;
  changeClassNameHandler: (term: string) => void;
}) {
  return (
    <>
      <div className="mb-4 text-center text-xl">
        <label htmlFor="search">講義名で検索</label>
      </div>
      <div className="m-2 flex h-[54px] w-[350px] rounded-2xl border bg-gray-100 p-2 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 sm:w-[430px]">
        <div className="flex items-center rounded-l-2xl  ">
          <MagnifyingGlassIcon className="size-7" />
        </div>
        <div className="flex w-full items-center">
          <input
            type="search"
            id="search"
            placeholder="講義名を入力"
            className="text-bold w-full rounded-r-2xl bg-gray-100 p-2 focus:outline-none"
            onChange={(e) => {
              setClassName(e.target.value);
              changeClassNameHandler(e.target.value);
            }}
            value={className}
          />
        </div>
      </div>
    </>
  );
}
