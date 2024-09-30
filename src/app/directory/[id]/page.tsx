import Header from '@src/components/header/BaseHeader';
import OrgHeader from '@src/components/club/listing/OrgHeader';
import OrgInfoSegment from '@src/components/club/listing/OrgInfoSegment';
import OrgUpcomingEvents from '@src/components/club/listing/OrgUpcomingEvents';
import { api } from '@src/trpc/server';
import { db } from '@src/server/db';
import { eq } from 'drizzle-orm';
import { type Metadata } from 'next';
import NotFound from '@src/components/NotFound';

const OrganizationPage = async ({ params }: { params: { id: string } }) => {
  const club = await api.club.getDirectoryInfo({ id: params.id });
  if (!club) return <NotFound elementType="Club" />;

  return (
    <main className="w-full md:pl-72">
      <Header />
      <div className="mb-5 flex flex-col space-y-4 px-3">
        <OrgHeader club={club} />
        <OrgInfoSegment club={club} />
        <OrgUpcomingEvents clubId={club.id} />
      </div>
    </main>
  );
};

export default OrganizationPage;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const found = await db.query.club.findFirst({
    where: (club) => eq(club.id, id),
  });

  if (!found)
    return {
      title: 'Organization not found',
      description: 'Organization not found',
    };

  return {
    title: `${found.name} - Jupiter`,
    description: found.description.slice(0, 30) + '...',
    openGraph: {
      url: `https://jupiter.utdnebula.com/directory/${found.id}`,
      description: found.name + ' - Jupiter',
    },
    alternates: {
      canonical: `https://jupiter.utdnebula.com/directory/${found.id}`,
    },
  };
}
