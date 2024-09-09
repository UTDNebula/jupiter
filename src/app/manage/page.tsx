import { BaseHeader } from '@src/components/BaseHeader';
import { getServerAuthSession } from '@src/server/auth';
import { api } from '@src/trpc/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signInRoute } from '@src/utils/redirect';
import { PlusIcon } from '@src/icons/Icons';
import ManagePanel from './ManagePanel';

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect(signInRoute('manage'));
  }
  const clubs = await api.club.getOfficerClubs();
  return (
    <main className="md:pl-72">
      <BaseHeader>
        <div className="mr-7 flex w-full flex-row items-center">
          <h1 className="h-min text-3xl font-bold text-blue-primary">
            Your Clubs
          </h1>
          <Link
            type="button"
            className="ml-auto flex flex-row items-center rounded-[1.875rem] bg-blue-primary px-8 py-4 text-white"
            href={'/directory/create'}
          >
            <span className="h-min">New Club</span>
            <PlusIcon fill="fill-white" />
          </Link>
        </div>
      </BaseHeader>
      <div className="px-5">
        <ManagePanel clubs={clubs} />
      </div>
    </main>
  );
}
