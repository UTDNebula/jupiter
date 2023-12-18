'use client';
import { api } from '@src/trpc/react';
import { type Session } from 'next-auth';
import { Fragment, useEffect, useRef } from 'react';
import DirectoryOrgs, { OrgDirectoryCardSkeleton } from './DirectoryOrgs';

type Props = {
  session: Session | null;
  tag?: string;
  cursor: number;
};

export default function InfiniteScrollGrid({ session, tag, cursor }: Props) {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    api.club.all.useInfiniteQuery(
      { tag, limit: 20 },
      {
        getNextPageParam: (lastPage) =>
          lastPage.clubs.length < 20 ? undefined : lastPage.cursor,
        initialCursor: cursor,
      },
    );

  const observer = useRef<IntersectionObserver>();
  const lastOrgElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || isFetchingNextPage) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (!entries[0]) return;
      if (entries[0].isIntersecting) {
        void fetchNextPage();
      }
    });

    if (lastOrgElementRef.current) {
      observer.current.observe(lastOrgElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <>
      {data && !isLoading
        ? data.pages.map((page, index) =>
            page.clubs.map((club, clubIndex) => {
              const isLastElement =
                index === data.pages.length - 1 &&
                clubIndex === page.clubs.length - 1;
              return (
                <div
                  ref={isLastElement ? lastOrgElementRef : null}
                  key={club.id}
                >
                  <DirectoryOrgs club={club} session={session} />
                </div>
              );
            }),
          )
        : Array.from({ length: 4 }, (_, index) => (
            <OrgDirectoryCardSkeleton key={index} />
          ))}
      {isFetchingNextPage &&
        Array.from({ length: 4 }, (_, index) => (
          <OrgDirectoryCardSkeleton key={index} />
        ))}
    </>
  );
}
