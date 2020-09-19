import React from 'react';
import MainLayout from '../../components/MainLayout';
import { Typography } from 'antd';

import TableList from '../../components/TableList';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const StudentPage = () => {
  const { Title, Link, Text } = Typography;
  return (
    <>
      <Title level={1}>Student Page</Title>
      <TableList data={data} column={columns} />
    </>
  );
};

export default StudentPage;
