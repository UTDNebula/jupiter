import Header from '../components/BaseHeader';
import Carousel from '../components/Carousel';
import TagFilter from '../components/TagFilter';
import OrgDirectoryGrid from '../components/OrgDirectoryGrid';
import type { Metadata } from 'next';
import { api } from '@src/trpc/server';
import { getServerAuthSession } from '@src/server/auth';

export const metadata: Metadata = {
  title: 'Jupiter - Nebula',
  description: 'Get connected on campus.',
  alternates: {
    canonical: 'https://jupiter.utdnebula.com',
  },
  openGraph: {
    url: 'https://jupiter.utdnebula.com',
    description: 'Jupiter - Nebula Labs',
  },
};

type Params = {
  searchParams: { [key: string]: string | undefined };
};

const Home = async (props: Params) => {
  const tags = await api.club.distinctTags.query();
  const session = await getServerAuthSession();
  return (
    <main className="md:pl-72 ">
      <Header />
      <div className="px-5">
        <div className="relative block w-full">
          <Carousel />
        </div>
        <TagFilter tags={tags} />
        <OrgDirectoryGrid tag={props.searchParams.tag} session={session} />
      </div>
    </main>
  );
};

export default Home;
