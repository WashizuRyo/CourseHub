'use client';

import { useSetQueryParams } from '@/app/hooks/functions';
import FacultySelect from '@/app/ui/universities/review-search/faculty-select';
import LectureSearchBar from '@/app/ui/universities/review-search/lecture-search-bar';
import SortSelect from '@/app/ui/universities/review-search/sort-select';

export default function ReviewSearch() {
  const {
    className,
    facultyValue,
    sortValue,
    setClassName,
    changeClassNameHandler,
    changeFacultyHandler,
    changeSortHandler,
  } = useSetQueryParams();

  return (
    <section>
      {/* 講義検索欄 */}
      <LectureSearchBar
        className={className}
        setClassName={setClassName}
        changeClassNameHandler={changeClassNameHandler}
      />

      <div className="flex flex-col">
        {/* 学部名検索欄 */}
        <FacultySelect
          facultyValue={facultyValue}
          changeFacultyHandler={changeFacultyHandler}
        />

        {/* ソート選択欄 */}
        <SortSelect
          sortValue={sortValue}
          changeSortHandler={changeSortHandler}
        />
      </div>
    </section>
  );
}
