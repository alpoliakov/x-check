import React, { useState } from 'react';
import { Typography } from 'antd';
import Users from './users';
import { db } from '../../../firebase';
import MainLayout from '../../../components/MainLayout';

import { Table } from 'antd';

// import TableList from '../../../components/TableList';

interface PropsStudentPage {
  data?: [];
  column?: [];
  dataRow?: [];
}

const StudentPage: React.FC<PropsStudentPage> = ({ data, column, dataRow }) => {
  const { Title } = Typography;
  const [toUsers, setToUsers] = useState(false);
  const goToUsers = () => {
    setToUsers(!toUsers);
  };

  return (
    <MainLayout title={'main: student'}>
      <Title level={1}>Student Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            <Title level={2}>Student</Title>
            <a onClick={goToUsers}>Users</a>
          </div>
        </div>
        <div className="workspace">
          <h1>Working Space</h1>
          {toUsers && <Users data={data} />}
          <Table dataSource={dataRow} columns={column} />
        </div>
      </main>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  let data: any | undefined = [];
  // let courseUser: any | undefined = [];
  await db
    .collection('users')
    .get()
    .then((snap) => {
      data = snap.docs.map((doc) => doc.data());
      // courseUser = data.filter((user) => user.course.includes(activeCourse));
      // console.log(data);
    });

  // let courseCrossCheckTasks: any | undefined = [];
  // await db
  //   .collection('course')
  //   .get()
  //   .then((snap) => {
  //     courseCrossCheckTasks = snap.docs
  //       .map((doc) => doc.data())
  //       .filter((el) => el.name === activeCourse)[0]
  //       .map((task) => task.checkingType === 'crossCheck');
  //   });

  const courseCrossCheckTasks = [
    {
      id: 'task',
      name: 'task',
      checkingType: 'crossCheck',
    },
    {
      id: 'task1',
      name: 'task1',
      checkingType: 'not crossCheck',
    },
    {
      id: 'task2',
      name: 'task2',
      checkingType: 'crossCheck',
    },
    {
      id: 'task3',
      name: 'task3',
      checkingType: 'not crossCheck',
    },
  ];

  const courseUser = [
    {
      location: 'unknown',
      login: 'mariariazanova',
      avatar_url: 'https://avatars3.githubusercontent.com/u/57406080?v=4',
      html_url: 'https://github.com/mariariazanova',
      nickname: 'mariariazanova',
      email: 'mv_13@mail.ru',
      password: 'ZZzz1122',
      uid: '41iPtdzIYHV5XxwnXRgOm1Nr14H3',
      roles: ['student', 'mentor', 'admin', 'manager'],
      name: 'Maria Riazanova',
      task: {
        scores: [
          { reviewer: 'egor', score: '0' },
          { reviewer: 'stas', score: '12' },
        ],
        id: 'utuygj',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'eryrytr',
      },
    },
    {
      html_url: 'https://github.com/alpoliakov',
      nickname: 'alpoliakov',
      roles: ['student', 'admin', 'mentor', 'manager'],
      location: 'Kyiv',
      avatar_url: 'https://avatars1.githubusercontent.com/u/27024108?v=4',
      name: 'Aleksandr Poliakov',
      login: 'alpoliakov',
      email: 'alpoliakov73@gmail.com',
      uid: '5iwVTjafzVayLNusWyaxqbaTB6u1',
      task: {
        scores: [
          { reviewer: 'egor', score: '15' },
          { reviewer: 'stas', score: '1' },
        ],
        id: 'qwqeq',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'tertry',
      },
    },
    {
      html_url: 'https://github.com/cup0ra',
      uid: 'JpeOZBnDFOdWFnny8B2to58DKNg1',
      name: 'sergey',
      login: 'cup0ra',
      avatar_url: 'https://avatars1.githubusercontent.com/u/57291691?v=4',
      roles: ['student', 'admin', 'mentor', 'manager'],
      nickname: 'cup0ra',
      email: null,
      location: null,
      task: {
        scores: [
          { reviewer: 'egor', score: '100' },
          { reviewer: 'stas', score: '19' },
        ],
        id: 'jgugu',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'hrthtrh',
      },
    },
    {
      name: null,
      email: null,
      roles: ['student', 'admin', 'mentor', 'manager'],
      nickname: 'SLatyankov',
      uid: 'Q3npcG2fnxbOPrnunZNnbp92Zdz2',
      avatar_url: 'https://avatars1.githubusercontent.com/u/47479375?v=4',
      login: 'SLatyankov',
      html_url: 'https://github.com/SLatyankov',
      location: null,
      task: {
        scores: [
          { reviewer: 'egor', score: '55' },
          { reviewer: 'stas', score: '13' },
        ],
        id: 'adada',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'qrsdsgd',
      },
    },
    {
      nickname: 'igorzima',
      location: null,
      login: 'igorzima',
      roles: ['student', 'admin', 'mentor', 'manager'],
      avatar_url: 'https://avatars0.githubusercontent.com/u/49781540?v=4',
      name: 'Ihar Zimnitski',
      uid: 'sZvSHsJdnRQyaNkAERz9eaj0ra03',
      email: null,
      html_url: 'https://github.com/igorzima',
      task: {
        scores: [
          { reviewer: 'egor', score: '35' },
          { reviewer: 'stas', score: '40' },
        ],
        id: 'kuitiu',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'qrwrew',
      },
    },
    {
      roles: ['student', 'mentor', 'admin', 'manager'],
      login: 'GameBoy',
      email: 'alpoliakov@gmail.com',
      uid: 'xfsmOXqeFjd8ZpbnocMt3Qh1y3K3',
      html_url: 'https://github.com/GameBoy',
      name: 'Game Boy',
      password: '123456',
      location: 'unknown',
      nickname: 'Gameboy',
      avatar_url: 'https://avatars0.githubusercontent.com/u/38436537?v=4',
      task: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'vbnvnb',
      },
      task1: {
        scores: [
          { reviewer: 'egor', score: '30' },
          { reviewer: 'stas', score: '50' },
        ],
        id: 'fsfe',
      },
    },
  ];

  const dataRow = courseCrossCheckTasks
    .filter((task) => task.checkingType === 'crossCheck')
    .map((taskName) =>
      courseUser
        .filter((user) => user[taskName.name])
        .map((user, index) => ({
          key: index,
          user: user.name,
          task: taskName.name,
          reviewer: 'ant',
          score: 0,
        }))
    )
    .flat(Infinity);
  console.log(dataRow.flat(Infinity));

  const column = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      // sorter: (a, b) => a.user.length - b.user.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewer',
      key: 'reviewer',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
  ];

  // const dataRow = [
  //   {
  //     key: '1',
  //     user: 'Mike',
  //     task: '32',
  //     reviewer: 'Stas',
  //   },
  //   {
  //     key: '2',
  //     user: 'John',
  //     task: 42,
  //     reviewer: '10 Downing Street',
  //   },
  // ];

  return {
    props: { data, dataRow, column },
  };
};

export default StudentPage;
