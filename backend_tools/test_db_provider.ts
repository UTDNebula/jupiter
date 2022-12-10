import DbProvider from "./db_provider";

class DbTestProvider extends DbProvider {
    user_path: string = "TestUsers"
    club_path : string = "TestClubs"
    event_path : string = "TestEvents"
}
export default DbTestProvider