import Head from 'next/head';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import TagFilter from '../components/TagFilter';
import OrgDirectoryGrid from '@src/components/OrgDirectoryGrid';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '@src/server/api/root';
import { createInnerTRPCContext } from '@src/server/api/trpc';
import { api } from '@src/utils/api';

const Home = () => {
  const { data } = api.club.all.useQuery();
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://jupiter.utdnebula.com"
          key="canonical"
        />
        <meta property="og:url" content="https://jupiter.utdnebula.com" />
        <meta name="description" content="Jupiter - Nebula Labs" />
      </Head>
      <main className="md:pl-72 ">
        <Header />
        <div className="px-5">
          <div className="relative block w-full">
            <Carousel />
          </div>
          <TagFilter />
          <OrgDirectoryGrid clubs={data || []} />
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
  });

  await helpers.club.all.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};

export default Home;
