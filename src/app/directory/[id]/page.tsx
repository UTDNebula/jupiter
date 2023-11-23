import ClubDocuments from '@src/components/ClubDocuments';
import Header from '@src/components/BaseHeader';
import OrgHeader from '@src/components/OrgHeader';
import OrgInfoSegment from '@src/components/OrgInfoSegment';
import OrgUpcomingEvents from '@src/components/OrgUpcomingEvents';
import { api } from '@src/trpc/server';
import { PlusIcon } from '@src/components/Icons';
import { db } from '@src/server/db';
import { eq } from 'drizzle-orm';
import { club } from '@src/server/db/schema';
import { type Metadata } from 'next';
import NotFound from '@src/components/NotFound';

const OrganizationPage = async ({ params }: { params: { id: string } }) => {
  const club = await api.club.byId.query({ id: params.id });
  if (!club) return <NotFound elementType='Club' />;

  return (
    <main className="w-full md:pl-72">
      <Header />
      <div className="mb-5 flex flex-col space-y-8 px-7">
        <OrgHeader club={club} />
        <OrgInfoSegment club={club} />
        <OrgUpcomingEvents club_id={club.id} />
        <ClubDocuments />
        <div className="flex h-full w-full flex-row items-center justify-between rounded-lg bg-blue-100 px-14 py-7">
          <div className="text-lg font-bold text-blue-primary">Promo text</div>
          <button className="flex w-fit flex-row items-center justify-center rounded-3xl bg-blue-primary py-2.5 pl-5 pr-6 text-center text-xs font-extrabold text-white transition-colors hover:bg-blue-700">
            <PlusIcon />
            <div>Apply</div>
          </button>
        </div>
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

  const found = await db.query.club.findFirst({ where: eq(club.id, id) });

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
