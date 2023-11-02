import { ClubSearchBar, EventSearchBar } from '../SearchBar';

const filters = [
  'Upcoming Events',
  'Last weeks events',
  'Last month events',
  'Pick a Date',
] as const;
const order = [
  'newest',
  'recently updated',
  'Shortest Duration',
  'Longest Duration',
] as const;
const types = ['In-Person', 'Virtual', 'Multi-Day', 'Hybrid'] as const;

const EventSidebar = () => {
  return (
    <div className="flex w-64 flex-col space-y-10">
      <div className="flex flex-col space-y-7.5">
        <h2 className="text-sm font-bold text-slate-500">Filters</h2>
        <div className="flex flex-col space-y-2.5">
          {filters.map((value) => (
            <div
              key={value}
              className="h-10 w-64 rounded-lg bg-white py-2.5 drop-shadow-sm"
            >
              <label>
                <div className="ml-4 mr-10 flex flex-row items-center space-x-2.5 text-center">
                  <input type="radio" id={`filter-${value}`} name="filter" />
                  <p className="w-full text-xs font-extrabold text-slate-500">
                    {value}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-7.5">
        <h2 className="text-sm font-bold text-slate-500">Search for Club</h2>
        <ClubSearchBar />
      </div>
      <div className="flex flex-col space-y-7.5">
        <h2 className="text-sm font-bold text-slate-500">Order</h2>
        <div className="flex flex-col space-y-2.5">
          {order.map((value) => (
            <div
              key={value}
              className="h-10 w-64 rounded-lg bg-white py-2.5 drop-shadow-sm"
            >
              <label>
                <div className="ml-4 mr-10 flex flex-row items-center space-x-2.5 text-center">
                  <input type="radio" id={`order-${value}`} name="order" />
                  <p className="w-full text-xs font-extrabold text-slate-500">
                    {value}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-7.5">
        <h2 className="text-sm font-bold text-slate-500">Event Types</h2>
        <div className="flex flex-col space-y-2.5">
          {types.map((value) => (
            <div
              key={value}
              className="h-10 w-64 rounded-lg bg-white py-2.5 drop-shadow-sm"
            >
              <label>
                <div className="ml-4 mr-10 flex flex-row items-center space-x-2.5 text-center">
                  <input type="checkbox" id={`filter-${value}`} name="filter" />
                  <p className="w-full text-xs font-extrabold text-slate-500">
                    {value}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EventSidebar;
