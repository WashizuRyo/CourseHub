'use client';

import { singIn } from '@/app/lib/actions';

export default function SignIn() {
  return (
    <form action={singIn}>
      <button type="submit">Googleでログイン</button>
    </form>
  );
}
