export default function FacultySelect({
  facultyValue,
  changeFacultyHandler,
}: {
  facultyValue: string;
  changeFacultyHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="my-4 flex flex-col text-center">
      <label htmlFor="faculty" className="text-xl">
        学部で検索
      </label>
      <div className="mx-3 mt-3">
        <select
          id="faculty"
          name="faculty"
          className="text-bold mt-2 h-[54px] w-[350px] rounded-2xl border bg-gray-100 p-2 text-center shadow-sm sm:w-[430px]"
          onChange={(e) => {
            changeFacultyHandler(e);
          }}
          value={facultyValue}
        >
          <option value="">学部を選んでください</option>
          <option value="理学部">理学部</option>
          <option value="工学部">工学部</option>
          <option value="文学部">文学部</option>
          <option value="経済部">経済部</option>
        </select>
      </div>
    </div>
  );
}
