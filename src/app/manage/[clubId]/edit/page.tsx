import { api } from '@src/trpc/server';
import EditClubForm from './EditClubForm';
import Header from '@src/components/BaseHeader';
import { notFound } from 'next/navigation';

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
        <EditClubForm club={club} />
      </div>
    </main>
  );
}
