import { signIn } from '@@/auth';

export default function SignIn() {
  return (
    <form action={signin}>
      <button type="submit">Signin with Social Account</button>
    </form>
  );
}

async function signin() {
  'use server';
  await signIn();
}
