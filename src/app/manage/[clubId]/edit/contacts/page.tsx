import Header from '@src/components/BaseHeader';
import BackButton from '@src/components/backButton';
import { api } from '@src/trpc/server';
import { notFound } from 'next/navigation';
import EditContactForm from './EditContactForm';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const club = await api.club.byId.query({ id: id });
  if (!club) notFound();
  return (
    <main>
      <div className="md:pl-72">
        <Header />
        <div className="flex h-full w-full flex-col gap-y-5 p-5">
          <BackButton />
          <EditContactForm club={club} />
        </div>
      </div>
    </main>
  );
}
