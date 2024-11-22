import Header from '@src/components/header/BaseHeader';
import { ClubSearchComponent } from './ClubSearch';
import { getServerAuthSession } from '@src/server/auth';

type Params = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const clubSearch = async (props: Params) => {
  const params = await props.searchParams;
  const userSearch = params['q'] || '';
  const session = await getServerAuthSession();

  return (
    <main className="md:pl-72 min-h-screen">
      <div>
        <Header />
        <ClubSearchComponent userSearch={userSearch} session={session} />
      </div>
    </main>
  );
};

export default clubSearch;
