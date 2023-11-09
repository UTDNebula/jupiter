'use client';
import { PopoverClose, PopoverContent } from '@radix-ui/react-popover';
import { type Dispatch, type SetStateAction } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
type DatePickerPopoverProps = {
  range: DateRange | undefined;
  setRange: Dispatch<DateRange | undefined>;
};
const DatePickerPopover = ({ range, setRange }: DatePickerPopoverProps) => {
  return (
    <PopoverContent className="flex items-center rounded-lg bg-white p-5 shadow-md">
      <PopoverClose className="h-5 w-5 text-blue-primary" />
      <DayPicker mode="range" selected={range} onSelect={setRange} />
    </PopoverContent>
  );
};
export default DatePickerPopover;
