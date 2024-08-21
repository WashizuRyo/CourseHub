'use client';
import { singOut } from '@/app/lib/actions';

export default function SignOut() {
  return (
    <form action={singOut}>
      <button type="submit">ログアウト</button>
    </form>
  );
}
