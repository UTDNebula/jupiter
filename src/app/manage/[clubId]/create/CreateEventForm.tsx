'use client';

import { useEffect, useState } from 'react';
import { type SelectClub } from '@src/server/db/models';
import { createEventSchema } from '@src/utils/formSchemas';
import { useForm } from 'react-hook-form';
import { api } from '@src/trpc/react';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { UploadIcon } from '@src/icons/Icons';
import EventCardPreview from './EventCardPreview';
import TimeSelect from './TimeSelect';
import { type RouterOutputs } from '@src/trpc/shared';

const CreateEventForm = ({
  clubId,
  officerClubs,
}: {
  clubId: string;
  officerClubs: SelectClub[];
}) => {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm<z.infer<typeof createEventSchema>>({
      resolver: zodResolver(createEventSchema),
      defaultValues: {
        clubId: clubId,
      },
      mode: 'onSubmit',
    });
  const router = useRouter();
  const [watchDescription, watchStartTime] = watch([
    'description',
    'startTime',
  ]);
  const [loading, setLoading] = useState(false);
  const [eventPreview, setEventPreview] = useState<
    RouterOutputs['event']['findByFilters']['events'][number]
  >({
    name: '',
    clubId,
    description: '',
    location: '',
    liked: false,
    id: '',
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
    club: officerClubs.filter((v) => v.id == clubId)[0]!,
  });
  useEffect(() => {
    const subscription = watch((data, info) => {
      const { name, clubId, description, location, startTime, endTime } = data;
      const club = officerClubs.find((val) => val.id == data.clubId);
      if (club) {
        setEventPreview({
          name: name || '',
          clubId: clubId || '',
          description: description || '',
          location: location || '',
          liked: false,
          id: '',
          startTime:
            startTime?.toString() === '' || startTime === undefined
              ? new Date(Date.now())
              : new Date(startTime),
          endTime:
            endTime?.toString() === '' ||
            endTime?.toString() === 'Invalid Date' ||
            !endTime
              ? new Date(Date.now())
              : new Date(endTime),
          club,
        });
      }
      if (info.name == 'clubId') {
        router.replace(`/manage/${data.clubId}/create`);
      }
    });
    return () => subscription.unsubscribe();
  }, [router, watch, officerClubs]);

  const createMutation = api.event.create.useMutation({
    onSuccess: (data) => {
      if (data) {
        router.push(`/event/${data}`);
      }
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit = handleSubmit((data: z.infer<typeof createEventSchema>) => {
    if (!createMutation.isPending && !loading) {
      setLoading(true);
      createMutation.mutate(data);
    }
  });

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="flex w-full flex-row flex-wrap justify-start gap-10 overflow-x-clip pb-4 text-[#4D5E80]"
    >
      <div className="form-fields flex min-w-[320px] max-w-[830px] flex-1 flex-col gap-10">
        <div className="create-dropdown flex max-w-full flex-row justify-start gap-1 whitespace-nowrap py-2 text-2xl font-bold">
          <span>
            Create Club Event <span className="text-[#3361FF]">for</span>
          </span>
          <div className="flex-1">
            <select
              {...register('clubId')}
              className="w-full overflow-hidden text-ellipsis whitespace-nowrap bg-inherit text-[#3361FF] outline-none"
              defaultValue={clubId}
            >
              {officerClubs.map((club) => {
                return (
                  <option key={club.id} value={club.id}>
                    {club.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="event-pic w-full">
          <h1 className="mb-4 font-bold">Event Picture</h1>
          <p className="upload-label mb-11 text-xs font-bold">
            Drag or choose file to upload
          </p>
          <div className="upload-box flex h-48 w-full flex-col items-center justify-center gap-6 rounded-md bg-[#E9EAEF] opacity-50">
            <UploadIcon />
            <p className="text-xs font-bold">JPEG, PNG, or SVG</p>
          </div>
        </div>
        <div className="event-details flex w-full flex-col gap-4">
          <h1 className="font-bold">Event Details</h1>
          <div className="event-name">
            <label className="mb-2 block text-xs font-bold" htmlFor="name">
              Event Name
            </label>
            <input
              type="text"
              className="w-full rounded-md p-2 text-xs shadow-sm outline-none placeholder:text-[#7D8FB3]"
              placeholder="Event name"
              {...register('name')}
            />
          </div>
          <div className="event-location">
            <label className="mb-2 block text-xs font-bold" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              className="w-full rounded-md p-2 text-xs shadow-sm outline-none placeholder:text-[#7D8FB3]"
              placeholder="123 Fun Street"
              {...register('location')}
            />
          </div>
          <div className="event-description">
            <div className="desc-header flex w-full justify-between">
              <label
                className="mb-2 block text-xs font-bold"
                htmlFor="description"
              >
                Description
              </label>
              <p className="text-xs">
                {watchDescription && watchDescription.length} of 1000 Characters
                used
              </p>
            </div>
            <textarea
              {...register('description')}
              className="w-full rounded-md p-2 text-xs shadow-sm outline-none placeholder:text-[#7D8FB3]"
              placeholder="Event description"
            />
          </div>
        </div>
        <TimeSelect
          setValue={setValue}
          getValues={getValues}
          watchStartTime={watchStartTime}
          control={control}
        />
        <input
          type="submit"
          value="Create Event"
          className={`bg-[#3361FF] ${loading ? 'opacity-40' : ''} rounded-md py-6 text-xs font-black text-white hover:cursor-pointer`}
        />
      </div>
      <div className="form-preview flex w-64 flex-col gap-14">
        <h1 className="text-lg font-bold">Preview</h1>
        {eventPreview && <EventCardPreview event={eventPreview} />}
      </div>
    </form>
  );
};
export default CreateEventForm;
