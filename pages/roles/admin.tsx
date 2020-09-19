import React from 'react';
import MainLayout from '../../components/MainLayout';
import AdminMain from '../../components/Admin/AdminMain';
import { Typography } from 'antd';

const AdminPage = () => {
  const { Title, Link, Text } = Typography;
  return (
    <>
      <AdminMain />
    </>
  );
};

export default AdminPage;
