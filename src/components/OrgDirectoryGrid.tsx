'use client';
import { Fragment, type FC } from 'react';
import DirectoryOrgs, { OrgDirectoryCardSkeleton } from './DirectoryOrgs';
import { api } from '@src/trpc/react';
import { type Session } from 'next-auth';

interface Props {
  tag?: string;
  session: Session | null;
}

const OrgDirectoryGrid: FC<Props> = ({ tag, session }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.club.all.useInfiniteQuery(
      { tag, limit: 20 },
      {
        getNextPageParam: (lastPage) =>
          lastPage.clubs.length < 20 ? undefined : lastPage.cursor,
      },
    );

  const handleLoadMore = () => {
    if (!hasNextPage) return;
    void fetchNextPage();
  };

  return (
    <div className="flex w-full flex-wrap justify-center gap-16 pb-5">
      {data
        ? data.pages.map((page, index) => (
            <Fragment key={index}>
              {page.clubs.map((club) => (
                <DirectoryOrgs key={club.id} club={club} session={session} />
              ))}
            </Fragment>
          ))
        : Array.from({ length: 4 }).map((_, index) => (
            <OrgDirectoryCardSkeleton key={index} />
          ))}
      {isFetchingNextPage &&
        Array.from({ length: 4 }).map((_, index) => (
          <OrgDirectoryCardSkeleton key={index} />
        ))}
      <div className="flex w-full flex-wrap justify-center gap-16">
        <button
          onClick={handleLoadMore}
          className="rounded-full bg-blue-primary px-8 py-4 text-xs font-extrabold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-500"
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading...'
            : !hasNextPage
            ? 'No More Clubs'
            : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default OrgDirectoryGrid;
