import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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

export const auth = firebase.auth();
export const databaseRef = firebase.database().ref();
// Для работы с пользователями
export const checkRef = databaseRef.child(USERS);
// Для работы с задачами
export const tasksRef = databaseRef.child(TASKS);
// Для работы с сессиями
export const sessionsRef = databaseRef.child(SESSIONS);
// Для работы с оценками
export const scoreRef = databaseRef.child(SCORE);
// Для работы с выполненными задачами
export const completedTasksRef = databaseRef.child(COMPLETED_TASKS);

export default firebase;
