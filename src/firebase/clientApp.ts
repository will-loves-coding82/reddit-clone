// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'

// stores photos, videos, etc
import {getFirestore} from 'firebase/firestore'

// stores json
import {getStorage} from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/*  Initialize Firebase for server side rendering we need to avoid initalizing an
    app on the client and server side.
    Next js renders the app on the server and that is sent 
    to the client where client side rendering occurs.
    
*/
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// access firestore database 
const firestore = getFirestore(app)

// access firestore authentication
const auth = getAuth(app)

const storage = getStorage(app)

// now we can use these in our files!
export {app, firestore, auth, storage} ;

