import Image from 'next/image'

type Props = {
  imageUrl: string
}

export const Avatar = ({ imageUrl }: Props) => {
  return <Image src={imageUrl} alt='user image' width={64} height={64} className='rounded-full' />
}
