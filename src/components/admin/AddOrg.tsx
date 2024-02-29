'use client';

import { useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import OrgSearch from './OrgSearch';
import 'react-day-picker/dist/style.css';
import { api } from '@src/trpc/react';
import { useRouter } from 'next/navigation';

type AddOrg = {
  range: DateRange;
  orgId: string | null;
  name: string | null;
};

export default function AddOrg() {
  const [addOrg, setAddOrg] = useState<AddOrg>({
    range: { from: undefined, to: undefined },
    orgId: null,
    name: null,
  });
  const router = useRouter();
  const utils = api.useContext();
  const { mutate } = api.admin.addOrgCarousel.useMutation({
    onSuccess: async () => {
      await utils.admin.upcomingCarousels.invalidate();
      await utils.club.getCarousel.invalidate();
      await utils.club.getCarousel.refetch();
      await utils.admin.upcomingCarousels.refetch();
      router.push('/admin/carousel');
    },
  });

  function onClick() {
    if (!addOrg.orgId || !addOrg.range.from || !addOrg.range.to) return;

    mutate({
      orgId: addOrg.orgId,
      range: addOrg.range,
    });
  }

  function setOrg({ id, name }: { id: string; name: string }) {
    setAddOrg({ ...addOrg, orgId: id, name });
  }

  function setRange(range: DateRange | undefined) {
    setAddOrg({
      ...addOrg,
      range: {
        from: range?.from ? range.from : undefined,
        to: range?.to ? range.to : undefined,
      },
    });
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-xl bg-white p-8 shadow-lg">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full">
          <OrgSearch setOrg={setOrg} />
          {addOrg.name && (
            <div className="text-2xl font-semibold text-gray-800">
              Adding {addOrg.name}
            </div>
          )}
          {addOrg.range.from && addOrg.range.to && (
            <div className="flex flex-col space-y-2 text-base text-gray-700">
              <div>
                <span className="font-semibold">From:</span>
                <span className="ml-2">
                  {addOrg.range.from.toLocaleDateString(undefined, {
                    dateStyle: 'long',
                  })}
                </span>
              </div>
              <div>
                <span className="font-semibold">To:</span>
                <span className="ml-2">
                  {addOrg.range.to.toLocaleDateString(undefined, {
                    dateStyle: 'long',
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
        <DayPicker
          mode="range"
          selected={addOrg.range}
          onSelect={setRange}
          className="rounded-md border p-4"
          disabled={{ before: new Date() }}
        />
      </div>
      <button
        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-lg font-bold text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
        onClick={onClick}
        disabled={!addOrg.orgId || !addOrg.range.from || !addOrg.range.to}
      >
        Add Org
      </button>
    </div>
  );
}
