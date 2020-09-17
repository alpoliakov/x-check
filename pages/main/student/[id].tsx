import React, { useState, useEffect } from 'react';
import MainLayout from '../../../components/MainLayout';
import { Typography } from 'antd';
import { db } from '../../../firebase';
const { Text, Title } = Typography;

const UserData = ({ content }: any) => {
  const [user, setUser] = useState(null);

  const updateUserData = () => {
    setUser(content);
  };

  useEffect(() => {
    if (content) {
      updateUserData();
    }
  }, []);

  if (!user) {
    return (
      <>
        <MainLayout>
          <Title level={2}>Loading...</Title>
        </MainLayout>
      </>
    );
  }

  const { name, nickname, location, email, html_url } = content;

  return (
    <MainLayout>
      <div>
        <Title level={2}>{name ?? nickname}</Title>
        <div>
          <Text>{location}</Text>
        </div>
        <div>
          <Text>{email}</Text>
        </div>
        <div>
          <Text>{html_url}</Text>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async ({ query }: any) => {
  let content = { name: '', nickname: '', location: '', email: '', html_url: '' };
  await db
    .collection('users')
    .doc(query.id)
    .get()
    .then((doc) => {
      content = Object.assign(content, doc.data());
    });

  return {
    props: {
      content: content,
    },
  };
};

export default UserData;
