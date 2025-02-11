import { Avatar } from '@/components/user/avatar'
import { UserIcon } from '@heroicons/react/24/solid'

type Props = {
  imageUrl: string | null
}

export const UserImage = ({ imageUrl }: Props) => {
  return (
    <>
      {imageUrl ? (
        <Avatar imageUrl={imageUrl} />
      ) : (
        <UserIcon className='size-[64px] rounded-full bg-gray-400 p-1 text-white' />
      )}
    </>
  )
}
