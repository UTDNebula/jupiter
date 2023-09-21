import { assert } from 'chai';
import DbTestProvider from '@src/backend_tools/test_db_provider';
import IClub from '@src/models/club';
import { type UserMetadata } from '@src/models/userMetadata';

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

describe('This is to create metadata for a user on Firebase', () => {
  it('should create metadata for a new user', (done) => {
    const user: UserMetadata = {
      first_name: 'Michael',
      last_name: 'Bee',
      major: 'Computer science',
      year: 'Freshman',
      role: 'Student',
      career: 'Engineering',
    };
    provider
      .createUserMetadata(user)
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
