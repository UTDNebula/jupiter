import ApprovedOrg from '@src/components/admin/ApprovedOrg';
import OtherOrgStatus from '@src/components/admin/OtherOrgStatus';
import { db } from '@src/server/db';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

type Props = { params: { id: string } };

export default async function Page({ params: { id } }: Props) {
  const org = await db.query.club.findFirst({
    where: (club) => eq(club.id, id),
  });
  if (!org) notFound();

  return (
    <div className="m-5 h-screen md:pl-72">
      <h1 className="text-center text-4xl font-bold">{org.name}</h1>
      {org.approved === 'approved' ? (
        <ApprovedOrg org={org} />
      ) : (
        <OtherOrgStatus org={org} />
      )}
    </div>
  );
}
