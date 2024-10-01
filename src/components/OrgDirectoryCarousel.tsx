'use client';

import { Key, useRef, type FC } from 'react';
import React, { useEffect, useState } from 'react';
import DirectoryOrgs from './DirectoryOrgs';
import { Session } from 'next-auth';
import { SelectClub } from '@src/server/db/models';
import { LeftArrowIcon, RightArrowIcon } from '@src/icons/Icons';

type Props = {
    clubs: SelectClub[],
    session?: Session
}

const OrgDirectoryCarousel: FC<Props> = ({ clubs, session }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const clubCard = useRef(null);
    const clubCardElement: HTMLDivElement = clubCard.current!;
    let clubCardWidth = 40;
    if (clubCardElement!) {
        clubCardWidth = clubCardElement.scrollWidth / 9.05;
    }

    function prev() {
        setCurrentIndex(currentIndex - 1);
    }

    function next() {
        setCurrentIndex(currentIndex + 1);
    }

    if (session) {
        return (
            <div className="carousel-container w-full flex flex-col relative">
                {
                    <div className="buttons flex justify-between py-8">
                        {currentIndex > 0 && 
                            <button onClick={prev} className="left-arrow bg-white absolute left-0 p-2">
                                <LeftArrowIcon fill={"black"}/>
                            </button>
                        }
                        {currentIndex < clubs.length - 1 &&
                            <button onClick={next} className="right-arrow bg-white absolute right-0 p-2">
                                <RightArrowIcon fill={"black"}/>
                            </button>
                        }
                    </div>
                }
                <div className="carousel-wrapper flex w-full relative">
                    <div className="carousel-content-wrapper overflow-hidden w-full h-full">
                        <div
                            className="carousel-content flex w-full flex-shrink-0 flex-grow transition ease-in-out duration-500"
                            style={{ transform: `translateX(-${currentIndex * clubCardWidth}%)` }}
                        >
                            {clubs.map((club) => (
                                <div className="pr-8 py-8" ref={clubCard}>
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