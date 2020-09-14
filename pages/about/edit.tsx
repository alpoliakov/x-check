import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { checkRef, auth } from '../../firebase';
import { useRouter } from 'next/router';
import { Card, Col, Row, Avatar, Typography, Empty } from 'antd';
import {
  GithubOutlined,
  EnvironmentOutlined,
  EditOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  TagOutlined,
  ReadOutlined,
  ContactsOutlined,
  NotificationOutlined,
  BookOutlined,
  MailOutlined,
} from '@ant-design/icons';

const EditUser: React.FC = () => {
  const [userData, setUserData] = useState({
    avatar_url: '',
    html_url: '',
    location: '',
    login: '',
    name: '',
    email: '',
  });
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [login, setLogin] = useState('');

  const { Title, Link, Text } = Typography;
  const router = useRouter();

  useEffect(() => {
    checkRef.on('value', (snapshot) => {
      const users = snapshot.val();
      for (let key in users) {
        // @ts-ignore
        if (users[key].uid === auth.currentUser.uid) {
          setUserData(users[key]);
          setUserName(users[key].name);
          setUserEmail(users[key].email);
          setUserAvatar(users[key].avatar_url);
          setLogin(users[key].login);
        }
      }
    });
  }, []);

  const backPage = () => {
    router.push(`/main`).catch((e) => new Error(e.message));
  };

  return (
    <>
      <MainLayout title={'Edit'}>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Card
                bordered={true}
                className="intro"
                actions={[
                  <EditOutlined key="edit-intro" />,
                  <SettingOutlined key="setting-intro" />,
                ]}
              >
                <Avatar size={90} src={userAvatar || '/static/images/king.jpg'} />
                <Title level={2}>{userName}</Title>
                <Title level={5}>
                  <Link href={userData.html_url}>
                    <GithubOutlined /> {`@${login}` || 'unknown'}
                  </Link>
                </Title>
                <div>
                  <Text>
                    <EnvironmentOutlined /> {userData.location || 'location'}
                  </Text>
                </div>
                <div>
                  <Text>
                    <MailOutlined /> {userEmail}
                  </Text>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[<InfoCircleOutlined key="info" />, <span key="about"> About</span>]}
                bordered={true}
                actions={[<EditOutlined key="edit-info" />, <SettingOutlined key="setting-info" />]}
                key="card-about"
              >
                <Empty
                  description="About info isn't written"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[
                  <TagOutlined key="english" />,
                  <span key="span-english"> Estimated English level</span>,
                ]}
                bordered={true}
                actions={[<EditOutlined key="edit-engl" />, <SettingOutlined key="setting-engl" />]}
                key="card-english"
              >
                <Empty
                  description="English level isn't choosen"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[<ReadOutlined key="education" />, <span key="span-edu"> Education</span>]}
                bordered={true}
                actions={[<EditOutlined key="edit-edu" />, <SettingOutlined key="setting-edu" />]}
                key="card-edu"
              >
                <Empty
                  description="Education history isn't filled in"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[
                  <ContactsOutlined key="contacts" />,
                  <span key="span-contacts"> Contacts</span>,
                ]}
                bordered={true}
                actions={[<EditOutlined key="edit-cont" />, <SettingOutlined key="setting-cont" />]}
                key="card-contacts"
              >
                <Empty
                  description="Contacts aren't filled in"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[
                  <NotificationOutlined key="consents" />,
                  <span key="span-cons"> Consents</span>,
                ]}
                bordered={true}
                actions={[<EditOutlined key="edit-cons" />]}
                key="card=cons"
              >
                <Empty description="Consents" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[
                  <BookOutlined key="statistics" />,
                  <span key="span-stat"> Student Statistics</span>,
                ]}
                bordered={true}
                actions={[<SettingOutlined key="setting-stat" />]}
                key="card-stat"
              >
                <Empty description="Statistics" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true} bodyStyle={{ textAlign: 'center' }} key="home">
                <Link onClick={backPage}>Return to pages</Link>
              </Card>
            </Col>
          </Row>
        </div>
      </MainLayout>
    </>
  );
};

export default EditUser;
