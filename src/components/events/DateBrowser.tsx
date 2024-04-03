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
const DateBrowser = () => {
  const { inputProps, dayPickerProps, setSelected } = useInput({
    defaultSelected: new Date(),
  });

  return (
    <div>
      <button
        onClick={() => {
          setSelected(subDays(dayPickerProps.selected!, 1));
        }}
      >
        back
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
      >
        forward
      </button>
    </div>
  );
};
export default DateBrowser;
