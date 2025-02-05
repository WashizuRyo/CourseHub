import { StarIcon } from '@heroicons/react/24/solid';

type Props = {
  starNumber: number;
};

export const StarNumber = ({ starNumber }: Props) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <>
      {stars.map((element, _) => (
        <div key={element}>
          {element > starNumber ? (
            <StarIcon className="size-8" />
          ) : (
            <StarIcon className="size-8 text-yellow-400" />
          )}
        </div>
      ))}
    </>
  );
};
