const EventsHeader = () => {
  return (
    <div className="navbar bg-base">
      <h1 className="navbar-start md:text-2xl">Events</h1>
      <input
        className="navbar-end input input-primary input-sm"
        type="text"
        placeholder="Search Events"
      />
    </div>
  );
};

export default EventsHeader;
