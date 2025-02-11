'use client'
import { singOut } from '@/lib/auth-utils'

export default function SignOut() {
  return (
    <form action={singOut}>
      <button type='submit'>ログアウト</button>
    </form>
  )
}
