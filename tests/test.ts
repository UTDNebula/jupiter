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


// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };
// Firebase.initializeApp(firebaseConfig)

const provider = new DbTestProvider()

//test to create a user
describe("This is to create a club on firebase", () => {
    it("should create a new club", (done) => {


        const club: Club = { name: "ACM", description: "Computer science club at UTD", contacts: { email: "deadmail@deadmail.com" } }

        const answer = provider.createClub(club).then(val => {
            assert.isTrue(val)
            done()
        })


    }).timeout(5000)

    it("Should delete the created club", (done) => {

        provider.deleteClub("ACM").then(val => {
            assert.isTrue(val)
            done()
        })
    }).timeout(3000)

})

describe("This is to create a user on firebase", () => {
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
            assert.isTrue(val)
            done()
        })
    })
}).timeout(5000)

describe("This is to query for the club `Nebula`", () => {
    it("Should retrieve the nebula object in the databaase", done => {

        const club = provider.getClubsByName("Nebula")
        club.then(val => {
            //need a way to get the club object from the db

            assert.equal(val[0].name, "Nebula")
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