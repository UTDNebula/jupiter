'use client';
import { api } from '@src/trpc/react';
import { type Session } from 'next-auth';
import { useEffect, useRef } from 'react';
import { type SelectClub } from '@src/server/db/models';
import ClubCard, { ClubCardSkeleton } from './club/ClubCard';

type Props = {
  session: Session | null;
  tag?: string;
};

export default function InfiniteScrollGrid({ session, tag }: Props) {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    api.club.all.useInfiniteQuery(
      { tag, limit: 9 },
      {
        getNextPageParam: (lastPage) =>
          lastPage.clubs.length < 9 ? undefined : lastPage.cursor,
        initialCursor: 9,
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
        ? data.pages.map((page: { clubs: SelectClub[] }, index: number) =>
            page.clubs.map((club, clubIndex) => {
              const isLastElement =
                index === data.pages.length - 1 &&
                clubIndex === page.clubs.length - 1;
              return (
                <div
                  ref={isLastElement ? lastOrgElementRef : null}
                  key={club.id}
                >
                  <ClubCard
                    club={club}
                    session={session}
                    priority={false}
                  />
                </div>
              );
            }),
          )
        : Array.from({ length: 4 }, (_, index) => (
            <ClubCardSkeleton key={index} />
          ))}
      {isFetchingNextPage &&
        Array.from({ length: 4 }, (_, index) => (
          <ClubCardSkeleton key={index} />
        ))}
    </>
  );
}
