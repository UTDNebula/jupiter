import Header from '@src/components/BaseHeader';
import { getServerAuthSession } from '@src/server/auth';
import { api } from '@src/trpc/server';
import ClubCard from './ClubCard';
import Link from 'next/link';

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) {
    return <div className="md:pl-72">You need to sign in</div>;
  }
  const clubs = await api.club.getOfficerClubs.query();
  return (
    <main className="md:pl-72">
      <Header />
      <div className="px-5">
        <div className="flex flex-row">
          <h1 className="bg-gradient-to-br from-blue-primary to-blue-700 bg-clip-text text-2xl font-extrabold text-transparent">
            Select a Club
          </h1>
          <Link
            className="ml-auto rounded-lg bg-blue-primary px-2.5 py-2 font-bold text-white shadow-sm"
            href={'/directory/create'}
          >
            create new club
          </Link>
        </div>
        <div className="flex flex-wrap p-4">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </main>
  );
}
