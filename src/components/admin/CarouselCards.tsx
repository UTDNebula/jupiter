'use client';
import { type api } from '@src/trpc/server';
import Image from 'next/image';
type Feature = Awaited<ReturnType<typeof api.club.getCarousel.query>>[0];

type Props = {
  item: Feature;
};

export default function CarouselCard({ item }: Props) {
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
    </div>
  );
}
