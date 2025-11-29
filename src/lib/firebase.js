import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// IMPORTANT: In this environment, we must use the global variable __firebase_config
// instead of process.env variables for initialization.
const firebaseConfig = typeof __firebase_config !== 'undefined' 
    ? JSON.parse(__firebase_config) 
    : {};

// Firebase initialization is simplified as we don't need the getApps() check 
// in this environment's React setup, and the app is handled within the context.
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Enable Firestore logging for easier debugging
setLogLevel('debug');

export { auth, db, app };
