'use client';

import 'react-day-picker/dist/style.css';
import { LeftArrowIcon, RightArrowIcon } from '@src/icons/Icons';
import { DayPicker } from 'react-day-picker';
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { addDays, format, isValid, parse, subDays } from 'date-fns';
import { useEffect, useId, useState } from 'react';
import { type eventParamsSchema } from '@src/utils/eventFilter';
import { useRouter } from 'next/navigation';

type DateBrowserProps = {
  filterState: eventParamsSchema;
};

const DATE_FORMAT = 'MM/dd/yyyy';

const DateBrowser = ({ filterState }: DateBrowserProps) => {
  const inputId = useId();
  const [month, setMonth] = useState<Date>(
    () => filterState.date ?? new Date(),
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    filterState.date,
  );
  const [inputValue, setInputValue] = useState(() =>
    filterState.date ? format(filterState.date, DATE_FORMAT) : '',
  );
  const router = useRouter();

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setMonth(date);
      setInputValue(format(date, DATE_FORMAT));
    } else {
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsedDate = parse(newValue, DATE_FORMAT, new Date());
    if (isValid(parsedDate)) {
      handleDateChange(parsedDate);
    }
  };

  const handleNavigateDate = (direction: 'forward' | 'back') => {
    const baseDate = selectedDate ?? new Date();
    const newDate =
      direction === 'forward' ? addDays(baseDate, 1) : subDays(baseDate, 1);
    handleDateChange(newDate);
  };

  useEffect(() => {
    if (!selectedDate) return;
    router.push(
      `/events?date=${encodeURIComponent(selectedDate.toISOString())}`,
    );
  }, [selectedDate, router]);

  return (
    <div className="flex w-full flex-row items-center justify-between rounded-3xl bg-white px-5 py-2.5 shadow-md md:w-fit">
      <button
        onClick={() => handleNavigateDate('back')}
        aria-label="Previous day"
        className="p-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="button"
      >
        <LeftArrowIcon fill="fill-black" />
      </button>

      <Popover>
        <PopoverTrigger asChild>
          <button
            className="mx-2 min-w-[120px] rounded px-3 py-1 text-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select date"
          >
            {inputValue || 'Select date'}
          </button>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent
            className="rounded-lg bg-white p-2 shadow-md"
            sideOffset={5}
          >
            <div className="flex flex-col">
              <input
                name="date"
                value={inputValue}
                onChange={handleInputChange}
                id={inputId}
                placeholder="MM/DD/YYYY"
                className="mb-2 rounded border p-2 text-sm"
                aria-label="Date input"
              />
              <DayPicker
                month={month}
                selected={selectedDate}
                onSelect={handleDateChange}
                onMonthChange={setMonth}
                mode="single"
                className="rounded-md border p-2"
              />
            </div>
          </PopoverContent>
        </PopoverPortal>
      </Popover>

      <button
        onClick={() => handleNavigateDate('forward')}
        aria-label="Next day"
        className="p-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="button"
      >
        <RightArrowIcon fill="fill-black" />
      </button>
    </div>
  );
};

export default DateBrowser;
