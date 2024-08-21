import { signOut } from '@@/auth';

export default function SignOut() {
  return (
    <form action={signin}>
      <button type="submit">logout</button>
    </form>
  );
}

async function signin() {
  'use server';
  await signOut();
}
