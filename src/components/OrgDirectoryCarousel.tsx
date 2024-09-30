'use client';

import { Key, type FC } from 'react';
import React, { useEffect, useState } from 'react';
import { api } from '@src/trpc/server';
import DirectoryOrgs from './DirectoryOrgs';
import { getServerAuthSession } from '@src/server/auth';
import { Session } from 'next-auth';
import { SelectClub } from '@src/server/db/models';

type Props = {
    clubs: SelectClub[],
    session?: Session
}

const OrgDirectoryCarousel: FC<Props> = ({ clubs, session }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    function prev() {
        setCurrentIndex(currentIndex - 1)
    }

    function next() {
        setCurrentIndex(currentIndex + 1)
    }

    if (session) {
        return (
            <div className="carousel-container w-full flex flex-col relative">
                {
                    <div className="buttons flex justify-between py-8">
                        {currentIndex > 0 && 
                            <button onClick={prev} className="left-arrow w-12 h-12 bg-white absolute left-0">
                                &lt;
                            </button>
                        }
                        {currentIndex < clubs.length - 1 &&
                            <button onClick={next} className="right-arrow w-12 h-12 bg-white absolute right-0">
                                &gt;
                            </button>
                        }
                    </div>
                }
                <div className="carousel-wrapper flex w-full relative">
                    <div className="carousel-content-wrapper overflow-hidden w-full h-full">
                    <div
                        className="carousel-content flex w-full flex-shrink-0 flex-grow transition ease-in-out duration-500"
                        style={{ transform: `translateX(-${currentIndex * 42.4}%)` }}
                    >
                        {clubs.map((club) => (
                            <div className="px-8 py-8">
                                <DirectoryOrgs key={club.id} club={club} session={session} priority />
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrgDirectoryCarousel;