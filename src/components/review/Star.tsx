import { StarIcon } from '@heroicons/react/24/solid'

const stars = [1, 2, 3, 4, 5]

export const Star = ({ starNumber }: { starNumber: number }) => {
  return (
    <>
      {stars.map((value, index) => (
        <div key={value} data-testid={`star-${index}`}>
          {value > starNumber ? <StarIcon className='size-8' /> : <StarIcon className='size-8 text-yellow-400' />}
        </div>
      ))}
    </>
  )
}
