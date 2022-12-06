import { assert, expect } from "chai"
import Club from "../models/club"
import DbProvider from "../pages/firebase_tools/db_provider"
import { config } from "dotenv"
import Firebase from "../pages/firebase_tools/firebase"


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



//test to create a user
describe("This is to create a user on firebase", () => {
    it("should create a new user", (done) => {

        const prov = new DbProvider()
        const club: Club = { name: "ACM maybe" }

        const answer = prov.createClub(club).then(val => {
            assert.isTrue(val)
            done()
        })


    }).timeout(5000)

})