import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Menu, Dropdown, Button, Select } from 'antd';
import { EyeOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { auth, checkRef, db } from '../firebase';
import { useRouter } from 'next/router';

const useRequest = () => {
  const [userData, setUserData] = useState({ roles: [] });
  // const getUserData = () => {
  //   checkRef.on('value', (snapshot) => {
  //     let users = snapshot.val();
  //     for (let key in users) {
  //       // @ts-ignore
  //       if (users[key].uid === auth.currentUser.uid) {
  //         setUserData(users[key]);
  //       }
  //     }
  //   });
  const getUserData = async () => {
    await db
      .collection('users')
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => {
          // @ts-ignore
          if (doc.data().uid === auth.currentUser.uid) {
            // @ts-ignore
            setUserData(doc.data());
          }
        });
      });
  };
  return [userData, getUserData];
};

interface PropsML {
  children?: React.ReactNode;
  title?: string;
  changeAuthorization?: () => void;
}

const MainLayout: React.FC<PropsML> = ({ children, title, changeAuthorization }) => {
  const router = useRouter();
  const { Option } = Select;
  const [currentRole, setCurrentRole] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, getUserData] = useRequest();

  const onChange = (value: string) => {
    router.push(`/main/${value}`).catch((e) => new Error(e.message));
    setCurrentRole(value);
  };

  // @ts-ignore
  const { roles } = userData;

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user): void => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    if (loggedIn) {
      // @ts-ignore
      getUserData().catch((e) => new Error(e.message));
      // setCurrentRole(currentRole);
    }
    return () => subscribe();
  }, [loggedIn, currentRole]);

  const logOut = () => {
    auth.signOut().then(
      () => {
        console.log('Logged out!');
      },
      (error) => {
        console.log(`${error.code} ${error.message}`);
      }
    );
    if (changeAuthorization) {
      changeAuthorization();
    }
    router.push('/').catch((e) => new Error(e.message));
  };

  const viewUser = () => {
    router.push(`/about/user`).catch((e) => new Error(e.message));
  };
  const editUser = () => {
    router.push(`/about/edit`).catch((e) => new Error(e.message));
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<EyeOutlined />}>
        <a className="ant-dropdown-link" onClick={viewUser}>
          View
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="edit" icon={<EditOutlined />}>
        <a className="ant-dropdown-link" onClick={editUser}>
          Edit
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <a className="ant-dropdown-link" type="button" onClick={logOut}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Head>
        <title>X-Check/{title}</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="HandheldFriendly" content="true" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="x-check app" />
        <meta name="keywords" content="cross-check, app, rsschool" />
        <link rel="shortcut icon" href="https://rs.school/favicon.ico" />
      </Head>
      <section className={'layout'}>
        <nav className={'nav'}>
          <div className="logo">
            <a href="https://app.rs.school/">
              <img
                src="/static/images/logo-rsschool3.png"
                alt="Rolling Scopes School Logo"
                className="header-logo"
              />
            </a>
          </div>
          <div className="name-page">
            <h2>{title}</h2>
          </div>
          <div className="my-profile">
            <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
              <Button type="dashed" size="large" onClick={(e) => e.preventDefault()}>
                <Avatar size="small" src="/static/images/king.jpg" />
                <span className="profile-text">My Profile</span>
              </Button>
            </Dropdown>
          </div>
        </nav>
        <section className={'select_role'}>
          <Select
            showSearch
            defaultValue={''}
            style={{ width: 200 }}
            placeholder={roles.length !== 0 ? 'Select a role' : 'Loading...'}
            optionFilterProp="children"
            onChange={onChange}
          >
            <Option value={''}>choice a role</Option>
            {roles.map((item: string) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </section>
        <main>{children}</main>
        <footer>Footer</footer>
      </section>
    </>
  );
};

export default MainLayout;
