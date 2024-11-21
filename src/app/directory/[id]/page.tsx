import Header from '@src/components/header/BaseHeader';
import ClubHeader from '@src/components/club/listing/ClubHeader';
import ClubInfoSegment from '@src/components/club/listing/ClubInfoSegment';
import ClubUpcomingEvents from '@src/components/club/listing/ClubUpcomingEvents';
import { api } from '@src/trpc/server';
import { db } from '@src/server/db';
import { eq } from 'drizzle-orm';
import { type Metadata } from 'next';
import NotFound from '@src/components/NotFound';

const ClubPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const club = await api.club.getDirectoryInfo({ id });
  if (!club) return <NotFound elementType="Club" />;

  return (
    <main className="w-full md:pl-72">
      <Header />
      <div className="mb-5 flex flex-col space-y-4 px-3">
        <ClubHeader club={club} />
        <ClubInfoSegment club={club} />
        <ClubUpcomingEvents clubId={club.id} />
      </div>
    </main>
  );
};

export default ClubPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

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
