import { assert } from 'chai';
import DbTestProvider from '@src/backend_tools/test_db_provider';
import IClub from '@src/models/club';
import { type User } from '@src/models/user';

const provider = new DbTestProvider();

//Test to create an organization
describe('This is to create a club on Firebase', () => {
  it('should create a new club', (done) => {
    // Creating a raw club object
    const raw = {
      name: 'Nebula Labs',
      description: 'Computer science club at UTD',
      contacts: { email: 'deadmail@deadmail.com' },
      id: 'test',
      tags: ['Computer Science', 'Coding'],
      events: [],
    };
    // This applies any default values to the club object
    const club = IClub.parse(raw);

    provider
      .createClub(club)
      .then((orgName) => {
        assert.isDefined(orgName);
        done();
      })
      .catch(done);
  }).timeout(5000);

  it('Should delete the created club', (done) => {
    provider
      .deleteClub('Nebula Labs')
      .then((val) => {
        assert.isTrue(val);
        done();
      })
      .catch(done);
  }).timeout(3000);
});

describe('This is to create a user on Firebase', () => {
  it('should create a new user', (done) => {
    const user: User = {
      first_name: 'Michael',
      last_name: 'Bee',
      major: 'Computer science',
      year: 'Freshman',
      role: 'Student',
      career: 'Engineering',
    };
    provider
      .createUser(user)
      .then((val) => {
        assert.isDefined(val);
        done();
      })
      .catch(done);
  });
}).timeout(5000);

describe('This is to query for the club `Nebula (Test)`', () => {
  it('Should retrieve the Nebula object in the databaase', (done) => {
    provider
      .getClubsByName('Nebula (Test)')
      .then((val) => {
        const nebula = val[0];
        if (!nebula) assert.fail('Nebula not found');
        assert.equal(nebula.name, 'Nebula (Test)');
        done();
      })
      .catch(done);
  });
}).timeout(5000);

/*
events (post and get)
more tests
get clubs if no query, random clubs
profile pictures
*/
