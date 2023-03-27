import DbProvider from './db_provider';

class DbTestProvider extends DbProvider {
  userPath = 'TestUsers';
  clubPath = 'TestClubs';
  eventPath = 'TestEvents';
}
export default DbTestProvider;
