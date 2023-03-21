import { assert, expect } from "chai"
import Club from "../models/club"
import DbProvider from "../backend_tools/db_provider"
import { config } from "dotenv"
import Firebase from "../backend_tools/firebase"
import User from "../models/user"
import Year from "../models/year"
import Role from "../models/role"
import Career from "../models/career"
import DbTestProvider from "../backend_tools/test_db_provider"

const provider = new DbTestProvider()

//Test to create an organization
describe("This is to create a club on Firebase", () => {
    it("should create a new club", (done) => {

        const club: Club = { name: "Nebula Labs", description: "Computer science club at UTD", contacts: { email: "deadmail@deadmail.com" } }

        const answer = provider.createClub(club).then(orgName => {
            assert.isDefined(orgName)
            done()
        })


    }).timeout(5000)

    it("Should delete the created club", (done) => {

        provider.deleteClub("Nebula Labs").then(val => {
            assert.isTrue(val)
            done()
        })
    }).timeout(3000)

})

describe("This is to create a user on Firebase", () => {
    it("should create a new user", (done) => {

        provider
        const user: User = {
            first_name: "Michael",
            last_name: "Bee",
            major: "Computer science",
            year: Year.freshman,
            role: Role.Student,
            career: Career.Engineering,


        }
        const answer = provider.createUser(user).then(val => {
            assert.isDefined(val)
            done()
        })
    })
}).timeout(5000)

describe("This is to query for the club `Nebula (Test)`", () => {
    it("Should retrieve the Nebula object in the databaase", done => {

        const club = provider.getClubsByName("Nebula (Test)")
        club.then(val => {
            //need a way to get the club object from the db

            assert.equal(val[0].name, "Nebula (Test)")
            done()
        })
    })
}).timeout(5000)




/*
events (post and get)
more tests
get clubs if no query, random clubs
profile pictures
*/