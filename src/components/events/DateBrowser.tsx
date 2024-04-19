'use client';

import 'react-day-picker/dist/style.css';
import { LeftArrowIcon, RightArrowIcon } from '@src/icons/Icons';
import { DayPicker, useInput } from 'react-day-picker';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { addDays, subDays } from 'date-fns';
import { type eventParamsSchema } from '@src/utils/eventFilter';
import { useEffect, useRef } from 'react';
import { eventTimeUpdate } from '@src/app/actions';
const DateBrowser = ({ filterState }: { filterState: eventParamsSchema }) => {
  const changeTime = eventTimeUpdate.bind(null, filterState);
  const { inputProps, dayPickerProps, setSelected } = useInput({
    defaultSelected: new Date(),
  });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    formRef.current?.requestSubmit();
  }, [dayPickerProps.selected]);
  return (
    <div className="flex flex-row rounded-xl bg-white p-1 align-middle">
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={changeTime} ref={formRef}>
        <button
          onClick={(e) => {
            setSelected(subDays(dayPickerProps.selected!, 1));
            e.currentTarget.form?.requestSubmit();
          }}
          aria-label="back one day"
          type="submit"
        >
          <div>
            <LeftArrowIcon fill="fill-black" />
          </div>
        </button>
        <Popover defaultOpen={false}>
          <PopoverTrigger>
            <input name="date" {...inputProps} />
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent className="flex items-center rounded-lg bg-white p-2 shadow-md">
              <DayPicker mode="default" {...dayPickerProps} />
              <PopoverClose className="h-5 w-5 text-blue-primary" />
            </PopoverContent>
          </PopoverPortal>
        </Popover>
        <button
          onClick={(e) => {
            setSelected(addDays(dayPickerProps.selected!, 1));
            e.currentTarget.form?.requestSubmit();
          }}
          aria-label="forward one day"
          type="submit"
        >
          <div>
            <RightArrowIcon fill="fill-black" />
          </div>
        </button>
      </form>
    </div>
  );
};
export default DateBrowser;
