import Image from 'next/image'

export const Avatar = ({ imageUrl }: { imageUrl: string }) => {
  return <Image src={imageUrl} alt='user image' width={64} height={64} className='rounded-full' />
}
