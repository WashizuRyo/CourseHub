export default function SortSelect({
  sortValue,
  changeSortHandler,
}: {
  sortValue: string;
  changeSortHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="text-center">
      <label htmlFor="sort"> 並び替え : </label>
      <select
        id="sort"
        onChange={(e) => {
          changeSortHandler(e);
        }}
        value={sortValue || 'desc'} // デフォルトは降順
      >
        <option value="">並び順を選んでください</option>
        <option value="desc">新しい順</option>
        <option value="asc">古い順</option>
      </select>
    </div>
  );
}
