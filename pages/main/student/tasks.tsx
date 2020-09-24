import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

interface PropsTasks {
  data2?: any[];
}

// @ts-ignore
const Tasks: NextPage<PropsUsers> = ({ data2 }) => {
  const [listTasks, setListTasks] = useState([]);

  useEffect(() => {
    let list = [];
    for (let key in data2) {
      // @ts-ignore
      list.push(data2[key]);
    }
    // @ts-ignore
    setListTasks(list);
  }, [data2]);

  return (
    <>
      <h1>Tasks</h1>
      <ul>
        {listTasks.map((item) => (
          <li key={`${item['uid']}`}>
            <Link href="./task/[id]" as={'./task/' + item['uid']}>
              <a>{item['name']}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tasks;
