import { useEffect, useState } from 'react';

function useDateRange(index: number) {
  const [dates, setDates] = useState(() => {
    const today = new Date();
    const daysSinceLastSunday = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysSinceLastSunday);
    return Array.from({ length: 7 }, (_, i) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      return currentDate;
    });
  });

  useEffect(() => {
    const firstDate = dates.at(0);
    if (!firstDate) return;
    firstDate.setDate(firstDate.getDate() + (index - 1) * 7);
    const newDates = Array.from({ length: 7 }, (_, i) => {
      const currentDate = new Date(firstDate);
      currentDate.setDate(firstDate.getDate() + i);
      return currentDate;
    });
    setDates(newDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return dates;
}

export default useDateRange;
