import Header from '@src/components/header/BaseHeader';
import { getServerAuthSession } from '@src/server/auth';
import { api } from '@src/trpc/server';
import { signInRoute } from '@src/utils/redirect';
import { redirect, notFound } from 'next/navigation';
import CreateEventForm from './CreateEventForm';

const Page = async ({ params }: { params: Promise<{ clubId: string }> }) => {
  const session = await getServerAuthSession();
  const { clubId } = await params;
  if (!session) {
    const route = await signInRoute(`manage/${clubId}/create`);
    redirect(route);
  }

  const officerClubs = await api.club.getOfficerClubs();
  const currentClub = officerClubs.filter((val) => {
    return val.id == clubId;
  })[0];
  if (!currentClub) {
    notFound();
  }

  return (
    <main className="h-screen md:pl-72">
      <Header />
      <div className="flex flex-row justify-between gap-20 px-5">
        <CreateEventForm clubId={currentClub.id} officerClubs={officerClubs} />
      </div>
    </main>
  );
};
export default Page;
