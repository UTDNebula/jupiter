import Header from '@src/components/header/BaseHeader';
import CreateClubForm from './createForm';
import { getServerAuthSession } from '@src/server/auth';
import { redirect } from 'next/navigation';
import { signInRoute } from '@src/utils/redirect';

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) {
    const route = await signInRoute('directory/create');
    redirect(route);
  }
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
