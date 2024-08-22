import {
  ArrowRightStartOnRectangleIcon,
  ArrowUpCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import type { Session } from 'next-auth';
import Image from 'next/image';
import SignIn from '../../signIn/signin-button';
import SignOut from '../../signOut/signout-button';

export default function Tooltip({ session }: { session: Session }) {
  return (
    <>
      <div
        role="tooltip"
        className="absolute right-[15px] top-[78px] z-10 h-min w-[200px]"
      >
        {session ? (
          <div className="rounded bg-blue-200 text-center text-gray-700">
            <div className="flex items-center">
              <Image
                src={session!.user!.image!}
                alt="user image"
                width={38}
                height={38}
                className="m-2 rounded-full"
              />
              {session.user?.name}
            </div>
            <div className="text-md flex size-full items-center gap-2 rounded py-2 hover:bg-blue-300">
              <ArrowRightStartOnRectangleIcon className="size-7" />
              <SignOut />
            </div>
          </div>
        ) : (
          <div className="rounded bg-blue-200 text-center text-gray-700">
            <div className="flex items-center pl-2">
              <UserIcon className="m-3 size-[38px] rounded-full bg-gray-300 p-2" />
            </div>
            <div className="text-md flex size-full items-center gap-2 rounded p-2 hover:bg-blue-300">
              <ArrowUpCircleIcon className="size-7" />
              <SignIn />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
