import { singIn } from '@/lib/actions'

export default function SignIn() {
  return (
    <form action={singIn}>
      <button type='submit'>Googleでログイン</button>
    </form>
  )
}
