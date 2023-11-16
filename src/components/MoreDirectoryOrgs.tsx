'use client';

import { api } from '@src/trpc/react';
import DirectoryOrgs from './DirectoryOrgs';
import { useInView } from 'react-intersection-observer';

const MoreDirectoryOrgs = ({ tag }: { tag?: string }) => {
  const query = api.club.allInfinite.useInfiniteQuery(
    { tag },
    { getNextPageParam: (lastPage) => lastPage.cursor, initialCursor: 20 },
  );
  const [lastRef] = useInView({
    onChange: (inView) => {
      if (inView) void query.fetchNextPage();
    },
  });
  return (
    <>
      {query.data?.pages.map((page) => {
        return (
          <>
            {page.clubs.map((club, index) => {
              if (index + 1 === page.clubs.length) {
                return (
                  <DirectoryOrgs key={club.id} club={club} ref={lastRef} />
                );
              }
              return <DirectoryOrgs key={club.id} club={club} />;
            })}
          </>
        );
      })}
    </>
  );
};
export default MoreDirectoryOrgs;
