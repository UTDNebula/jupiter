const EventsHeader = () => {
  return (
    <div className="md:flex md:justify-between md:pl-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Events</h1>
      <div className="md:col-start-4">
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
