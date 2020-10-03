// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { UserBasic } from '../../../interfaces/IUser';
import styles from './StudentHome.module.css';

const StudentHome: React.FC = () => {
  const [users, setUser] = useState<any>();
  const [myUid, setMyUid] = useState<any>();

  const getUsers = async () => {
    let userData: any;
    await db
      .collection('users')
      .get()
      .then((snap) => {
        userData = snap.docs.map((doc) => doc.data());
      });
    return userData;
  }
  const x = getUsers;
  // setUser(x);
  // useEffect(() => {
  //   const waitForCurrentUser = setInterval(() => {
  //     // @ts-ignore
  //     const uid = auth.currentUser;
  //     if (uid !== null) {
  //       clearInterval(waitForCurrentUser);
  //       const myuid = uid.uid;
  //       setMyUid(myuid);
  //       return uid;
  //     } else {
  //       console.log('Wait for it');
  //     }
  //   }, 1000);
  // }, []);
  // const user = users.filter((user) => user.uid === myUid);
  x();
  return (
    // {users}
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