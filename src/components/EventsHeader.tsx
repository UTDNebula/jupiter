const EventsHeader = () => {
  return (
    <div className="md:col-start-2 md:col-end-[-1] grid md:grid-cols-3">
      <h1 className="align-middle text-3xl font-bold text-gray-800 col-start-1">
        Events
      </h1>
      <div className="md:col-start-[-1]">
        <input
          className="w-full h-10 px-2 rounded-md border border-gray-300"
          type="text"
          placeholder="Search Events"
        />
      </div>
    </div>
  );
};

export default EventsHeader;
