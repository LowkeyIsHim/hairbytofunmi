import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// IMPORTANT: We use the global variable __firebase_config for all necessary 
// API keys and configurations, as provided by the hosting environment.
const firebaseConfig = typeof __firebase_config !== 'undefined' 
    ? JSON.parse(__firebase_config) 
    : {};

// Initialize the Firebase app, or use the existing one if it exists
const app = !getApps().length 
    ? initializeApp(firebaseConfig) 
    : getApp();

// Initialize the services
const auth = getAuth(app);
const db = getFirestore(app);

// Enable Firestore logging for easier debugging
setLogLevel('debug');

export { auth, db, app };
