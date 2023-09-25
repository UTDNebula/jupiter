import { assert } from 'chai';
import { db } from '../src/server/db';
import { club } from '../src/server/db/schema';
import { eq } from 'drizzle-orm';

//Test to create an organization
describe('This is to create a club on supabase', () => {
  it('should create a new club', (done) => {
    // Creating a raw club object
    const newClub: typeof club.$inferInsert = {
      name: 'TEST ORG',
      description: 'Computer science club at UTD',
    };

    db.insert(club)
      .values(newClub)
      .returning()
      .then((res) => {
        assert(res.length > 0);
        assert.equal(res[0]?.name, 'TEST ORG');
        done();
      })
      .catch(done);
  }).timeout(5000);

  it('Should delete the created club', (done) => {
    db.delete(club)
      .where(eq(club.name, 'TEST ORG'))
      .returning()
      .then((res) => {
        assert(res.length > 0);
        assert.equal(res[0]?.name, 'TEST ORG');
        done();
      })
      .catch(done);
  }).timeout(3000);
});
