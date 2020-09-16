import React, { useEffect, useState } from 'react';
import { checkRef } from '../../../firebase';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';
import { NextPage } from 'next';

interface PropsUsers {
  data?: [];
}

// @ts-ignore
const Users: NextPage<PropsUsers> = ({ data }) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    let list = [];
    for (let key in data) {
      // @ts-ignore
      list.push(data[key]['nickname']);
    }
    // @ts-ignore
    setListUsers(list);
  }, [data]);

  return (
    <>
      <h1>Users</h1>
      <ul>
        {listUsers.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Users;
