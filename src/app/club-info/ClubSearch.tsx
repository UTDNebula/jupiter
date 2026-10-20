'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ClubSearchBar, ClubSearchResult } from '@/systems/clubs/ClubSearchBar';
import ClubBanner from '@/systems/clubs/listing/ClubBanner';
import ClubTitle from '@/systems/clubs/listing/ClubTitle';
import { useTRPC } from '@/trpc/react';
import { RouterOutputs } from '@/trpc/shared';

type Club = NonNullable<RouterOutputs['club']['getDirectoryInfo']>;

export default function ClubSearch() {
  const [input, setInput] = useState('');

  // TODO: Change to use a query instead
  const [club, setClub] = useState<Club | undefined>();

  const handleSelect: (value: string | ClubSearchResult) => void = (value) => {
    if (typeof value === 'string') {
      console.log('no results found');
    } else {
      // TODO: Insert code here to trigger search
    }
  };

  return (
    <div className="m-auto mt-16 flex w-256 flex-col gap-8">
      <h1 className="text-4xl">Club Info</h1>
      <ClubSearchBar
        input={input}
        onChange={setInput}
        onSelect={handleSelect}
      />

      {club ? (
        <div className="mx-auto mb-5 flex max-w-6xl flex-col gap-y-6 p-4">
          <ClubBanner club={club} />
          <ClubTitle club={club} />
        </div>
      ) : (
        'No results'
      )}
    </div>
  );
}
