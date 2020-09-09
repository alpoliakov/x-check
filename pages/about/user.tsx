import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { checkRef, auth } from '../../firebase';
import { Card, Avatar, Divider, List } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Meta } = Card;

interface PropsUser {
  title: string;
}

const User: React.FC<PropsUser> = ({ title }) => {
  const [userData, setUserdata] = useState({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [uid, setUid] = useState('');
  const [roles, setRoles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    checkRef.on('value', (snapshot) => {
      const users = snapshot.val();
      for (let key in users) {
        // @ts-ignore
        if (users[key].uid === auth.currentUser.uid) {
          setUserdata(users[key]);
          setEmail(users[key].email);
          setName(users[key].nickname);
          setUid(users[key].uid);
          setRoles(users[key].roles);
        }
      }
    });
  }, []);

  const returnToPage = () => {
    router.push(`../../roles/${roles[0]}`);
  };

  return (
    <>
      <MainLayout title={`User page: ${name}`}>
        <main className={'main__about'}>
          <div>
            <Card
              style={{ width: 420 }}
              cover={
                <img
                  id="login-card-img"
                  className="login-card-img"
                  alt="logo RS School"
                  src="/static/images/logo-rs-school.svg"
                />
              }
              actions={[<LogoutOutlined key="logout" onClick={returnToPage} />]}
            >
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="YOUR PROFILE"
                description="Information about you"
              />
              <List size="small">
                <Divider orientation="center">Nickname</Divider>
                <h4>{name}</h4>
                <Divider orientation="center">Email</Divider>
                <h4>{email}</h4>
                <Divider orientation="center">ID</Divider>
                <h4>{uid}</h4>
                <Divider orientation="center">Roles</Divider>
                <h4>{roles.join(', ')}</h4>
              </List>
            </Card>
          </div>
        </main>
      </MainLayout>
    </>
  );
};

export default User;
