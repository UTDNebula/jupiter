'use client';
import { DayPicker, useInput } from 'react-day-picker';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '@radix-ui/react-popover';

import 'react-day-picker/dist/style.css';
import { addDays, subDays } from 'date-fns';
import { LeftArrowIcon, RightArrowIcon } from '@src/icons/Icons';
import { useEffect } from 'react';
import { eventParamsSchema } from '@src/utils/eventFilter';
import useSearch from '@src/utils/useSearch';
const DateBrowser = () => {
  const { inputProps, dayPickerProps, setSelected } = useInput({
    defaultSelected: new Date(),
  });
  const [filterState] = useSearch(eventParamsSchema);

  return (
    <div className="flex flex-row rounded-xl bg-white p-1 align-middle">
      <button
        onClick={() => {
          setSelected(subDays(dayPickerProps.selected!, 1));
        }}
        aria-label="back one day"
        type="button"
      >
        <div>
          <LeftArrowIcon fill="fill-black" />
        </div>
      </button>
      <Popover defaultOpen={false}>
        <PopoverTrigger>
          <form>
            <input {...inputProps} />
          </form>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent className="flex items-center rounded-lg bg-white p-2 shadow-md">
            <PopoverClose className="h-5 w-5 text-blue-primary" />
            <DayPicker mode="default" {...dayPickerProps} />
          </PopoverContent>
        </PopoverPortal>
      </Popover>
      <button
        onClick={() => {
          setSelected(addDays(dayPickerProps.selected!, 1));
        }}
        aria-label="forward one day"
      >
        <div>
          <RightArrowIcon fill="fill-black" />
        </div>
      </button>
    </div>
  );
};
export default DateBrowser;
