import { singIn } from '@/lib/auth-utils'

export default function SignIn() {
  return (
    <form action={singIn}>
      <button type='submit'>Googleでログイン</button>
    </form>
  )
}
