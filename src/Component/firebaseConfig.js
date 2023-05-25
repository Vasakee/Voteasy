import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBYf5TvDpgWIbPzufJ1ykkQT34lzT58Z6U",
    authDomain: "voteasy-2ae36.firebaseapp.com",
    projectId: "voteasy-2ae36",
    storageBucket: "voteasy-2ae36.appspot.com",
    messagingSenderId: "405748948660",
    appId: "1:405748948660:web:f33acff634db35777281e1",
    measurementId: "G-CJYY0NK7GW"
}



const app = initializeApp(firebaseConfig)
const database = getFirestore(app)
const auth = getAuth(app)

export { database, auth }