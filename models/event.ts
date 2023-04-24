interface Event {
  name: string;
  hostclub: string; //club name. THIS NEEDS TO BE THE SAME AS THE CLUB ID IN THE DATABASE.
  //this is becuz of db_provider references clubs via their "name"

  when: Date;
}
export default Event;
