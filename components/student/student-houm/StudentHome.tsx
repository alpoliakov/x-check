// import * as React from 'react';
import React from 'react';
import { db } from '../../../firebase';
import styles from './StudentHome.module.css';

const StudentHome: React.FC = () => {
  const getUsers = async () => {
    let userData: any;
    await db
      .collection('users')
      .get()
      .then((snap) => {
        userData = snap.docs.map((doc) => doc.data());
      });
    return userData;
  };
  const x = getUsers;

  x();
  return (
    <div>
      <div className={styles.info}>
        <div className={styles.info__title_block}>
          <p className={styles.info__title}>Your stats</p>
        </div>
        <div className={styles.info__main_wrapper}>
          <div className={styles.info__column_left}>
            <p className={styles.info__text}>Score Points</p>
            <p className={styles.info__data}>0</p>
            <p className={styles.info__text}>Status</p>
            <p className={styles.info__color}>Active</p>
          </div>
          <div className={styles.info__column_right}>
            <p className={styles.info__text}>Completed Tasks</p>
            <p className={styles.info__data}>0/0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
