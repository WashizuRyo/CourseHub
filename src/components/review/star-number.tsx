import { StarIcon } from '@heroicons/react/24/solid'

export const StarNumber = ({ starNumber }: { starNumber: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
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
