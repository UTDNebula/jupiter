import { api } from '@src/trpc/server';
import EditClubForm from './EditClubForm';
import Header from '@src/components/BaseHeader';
import { notFound } from 'next/navigation';
import EditContactForm from './EditContactForm';
import BackButton from '@src/components/BlueBackButton';

export default async function Page({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  const club = await api.club.byId({ id: clubId });
  if (!club) notFound();
  return (
    <main>
      <div className="md:pl-72">
        <Header />
        <div className="flex h-full w-full flex-col gap-y-5 p-5">
          <BackButton />
          <EditClubForm club={club} />
          <EditContactForm club={club} />
        </div>
      </div>
    </main>
  );
}
