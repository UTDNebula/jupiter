import DbProvider from './db_provider';

class DbTestProvider extends DbProvider {
  userPath: string = 'TestUsers';
  clubPath: string = 'TestClubs';
  eventPath: string = 'TestEvents';
}
export default DbTestProvider;
