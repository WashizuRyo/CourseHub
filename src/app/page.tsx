import SignIn from '@/app/ui/sign-in/sign-in';
import SignOut from '@/app/ui/sign-out/sign-out';
import { auth } from '@@/auth';

export default async function Test() {
  const session = await auth();
  console.log(session);
  return (
    <div className="h-screen bg-slate-800">
      <div className="text-white">
        {session ? <SignOut /> : <SignIn />}
        <h1>{session?.user?.name}</h1>
      </div>
    </div>
  );
}
