import Header from '@src/components/BaseHeader';
import CreateClubForm from './createForm';
import { getServerAuthSession } from '@src/server/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) redirect('/auth');
  return (
    <main>
      <div className="md:pl-72">
        <Header />
        <CreateClubForm
          user={{
            id: session.user.id,
            name: session.user.firstName + ' ' + session.user.lastName,
          }}
        />
      </div>
    </main>
  );
}
