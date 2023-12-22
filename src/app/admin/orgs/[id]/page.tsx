import AddOfficer from '@src/components/admin/AddOfficer';
import OfficerTable from '@src/components/admin/OfficerTable';
import { db } from '@src/server/db';
import { api } from '@src/trpc/server';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

type Props = { params: { id: string } };

export default async function Page({ params: { id } }: Props) {
  const org = await db.query.club.findFirst({
    where: (club) => eq(club.id, id),
  });
  if (!org) notFound();

  const officers = await api.club.getOfficers.query({ id: org.id });
  return (
    <div className="container m-5 h-screen md:pl-72">
      <h1>{org.name}</h1>
      <h2>Officers</h2>
      <OfficerTable officers={officers} />
      <AddOfficer clubId={org.id} />
    </div>
  );
}
