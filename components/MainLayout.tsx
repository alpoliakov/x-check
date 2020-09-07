import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Avatar, Menu, Dropdown, Button, message } from 'antd';
import { EyeOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';

interface PropsML {
  children?: React.ReactNode;
  title: string;
  changeAuthorization: () => void;
}

const MainLayout: React.FC<PropsML> = ({ children, title, changeAuthorization }) => {
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<EyeOutlined />}>
        <a className="ant-dropdown-link">View</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="edit" icon={<EditOutlined />}>
        <a className="ant-dropdown-link">Edit</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <a className="ant-dropdown-link" type="button" onClick={changeAuthorization}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Head>
        <title>X-Check/{title}</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
                <Avatar size="small" src="static/images/king.jpg" />
                <span className="profile-text">My Profile</span>
              </Button>
            </Dropdown>
          </div>
        </nav>
        <main>{children}</main>
      </section>
    </>
  );
};

export default MainLayout;
