'use client';

import { type FC } from 'react';
import React from 'react';
import { type Session } from 'next-auth';
import { type SelectClub } from '@src/server/db/models';
import ClubCard from './club/ClubCard';

type Props = {
  clubs: SelectClub[];
  session?: Session;
};

const OrgDirectoryCarousel: FC<Props> = ({ clubs, session }) => {
  if (session) {
    return (
      <div className="carousel-container relative flex w-full flex-col">
        <div className="carousel-wrapper relative flex w-full">
          <div className="carousel-content-wrapper h-full w-full overflow-hidden">
            <div className="carousel-content flex w-full flex-shrink-0 flex-grow overflow-x-auto">
              {clubs.map((club) => (
                <div className="py-8 pr-8" key={club.id}>
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
