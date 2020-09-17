import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

interface PropsUsers {
  data?: any[];
}

// @ts-ignore
const Users: NextPage<PropsUsers> = ({ data }) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    let list = [];
    for (let key in data) {
      // @ts-ignore
      list.push(data[key]);
    }
    // @ts-ignore
    setListUsers(list);
  }, [data]);

  return (
    <>
      <h1>Users</h1>
      <ul>
        {listUsers.map((item) => (
          <li key={`${item['uid']}`}>
            <Link href="./student/[id]" as={'./student/' + item['uid']}>
              <a>{item['nickname']}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Users;
