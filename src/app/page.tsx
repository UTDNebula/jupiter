import Header from '../components/header/BaseHeader';
import Carousel from '../components/club/directory/Carousel';
import TagFilter from '../components/club/directory/TagFilter';
import ClubDirectoryGrid from '../components/club/directory/ClubDirectoryGrid';
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

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const Home = async ({ searchParams }: Props) => {
  const params = await searchParams;
  void api.club.all.prefetch({ tag: params.tag });
  const [tags, featured, session] = await Promise.all([
    api.club.distinctTags(),
    api.club.getCarousel(),
    getServerAuthSession(),
  ]);
  const onlyClubs = featured.map((item) => item.club);

  return (
    <main className="md:pl-72">
      <Header />
      <div className="px-2 md:px-5">
        <div className="relative block w-full">
          <Carousel clubs={onlyClubs} />
        </div>
        <TagFilter tags={tags} selectedTag={params.tag} />
        <ClubDirectoryGrid session={session} />
      </div>
    </main>
  );
};

export default Home;
