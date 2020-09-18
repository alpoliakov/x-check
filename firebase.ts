import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_SID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MID,
};

const USERS = 'users';
const TASKS = 'tasks';
const SESSIONS = 'sessions';
const SCORE = 'score';
const COMPLETED_TASKS = 'completed_tasks';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.firestore();

export const auth = firebase.auth();
export const databaseRef = firebase.database().ref();
export const checkRef = databaseRef.child(USERS);

export default firebase;
