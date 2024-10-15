'use client';

import { useRef, type FC } from 'react';
import React, { useState } from 'react';
import { type Session } from 'next-auth';
import { type SelectClub } from '@src/server/db/models';
import { LeftArrowIcon, RightArrowIcon } from '@src/icons/Icons';
import ClubCard from './club/ClubCard';

type Props = {
  clubs: SelectClub[];
  session?: Session;
};

const OrgDirectoryCarousel: FC<Props> = ({ clubs, session }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const clubCard = useRef(null);
  const clubCardElement: HTMLDivElement = clubCard.current!;
  let clubCardWidth = 0;
  if (clubCardElement) {
    clubCardWidth = clubCardElement.scrollWidth;
  }

  function prev() {
    setCurrentIndex(currentIndex - 1);
  }

  function next() {
    setCurrentIndex(currentIndex + 1);
  }

  if (session) {
    return (
      <div className="carousel-container relative flex w-full flex-col">
        {
          <div className="buttons flex justify-between pb-8 pt-4">
            {currentIndex > 0 && (
              <button
                onClick={prev}
                className="left-arrow absolute left-0 bg-white p-2"
              >
                <LeftArrowIcon fill={'black'} />
              </button>
            )}
            {currentIndex < clubs.length - 1 && (
              <button
                onClick={next}
                className="right-arrow absolute right-0 bg-white p-2"
              >
                <RightArrowIcon fill={'black'} />
              </button>
            )}
          </div>
        }
        <div className="carousel-wrapper relative flex w-full">
          <div className="carousel-content-wrapper h-full w-full overflow-hidden">
            <div
              className="carousel-content flex w-full flex-shrink-0 flex-grow transition duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * clubCardWidth}px)`,
              }}
            >
              {clubs.map((club) => (
                <div className="py-8 pr-8" key={club.id} ref={clubCard}>
                  <ClubCard
                    key={club.id}
                    club={club}
                    session={session}
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default OrgDirectoryCarousel;
