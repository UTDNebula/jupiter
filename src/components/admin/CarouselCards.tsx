'use client';
import { api } from '@src/trpc/react';
import { type api as API } from '@src/trpc/server';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
type Feature = Awaited<ReturnType<typeof API.club.getCarousel>>[number];

type Props = {
  item: Feature;
};

export default function CarouselCard({ item }: Props) {
  const router = useRouter();
  const { mutate } = api.admin.removeOrgCarousel.useMutation({
    onSuccess: () => router.refresh(),
  });
  return (
    <div
      className="flex flex-col items-center rounded-lg bg-white p-5 shadow-lg"
      key={item.orgId}
    >
      <Image
        className="rounded-md"
        src={item.club.image}
        alt={item.club.name}
        width={200}
        height={200}
      />
      <p className="mt-2 text-center text-lg font-medium">{item.club.name}</p>
      <div className="mt-1 text-sm text-gray-600">
        From{' '}
        {item.startTime.toLocaleDateString(undefined, {
          dateStyle: 'short',
        })}{' '}
        to{' '}
        {item.endTime.toLocaleDateString(undefined, {
          dateStyle: 'short',
        })}
      </div>
      <div className="mt-2">
        <button
          className="rounded-md bg-red-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-600"
          onClick={() => mutate({ id: item.orgId })}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
