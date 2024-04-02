import { CalendarButton } from '@src/icons/Icons';

export default function AddToCalendarButton() {
  return (
    <main className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md hover:bg-blue-500 inset-0 overflow-visible">
      <CalendarButton />

      <div className="absolute left-0 -bottom-12 w-28 h-10 bg-blue-500 z-20">
        A
      </div>
    </main>
  );
}
