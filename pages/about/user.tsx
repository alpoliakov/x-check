import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { checkRef, auth } from '../../firebase';
import { useRouter } from 'next/router';
import { Card, Col, Row, Avatar, Typography, Empty } from 'antd';
import {
  GithubOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  TagOutlined,
  ReadOutlined,
  ContactsOutlined,
  NotificationOutlined,
  BookOutlined,
  MailOutlined,
} from '@ant-design/icons';

interface PropsUser {
  title: string;
}

const User: React.FC<PropsUser> = ({ title }) => {
  const [userData, setUserData] = useState({
    avatar_url: '',
    html_url: '',
    location: '',
    login: '',
    name: '',
    email: '',
  });
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [uid, setUid] = useState('');
  const [roles, setRoles] = useState([]);
  const router = useRouter();
  const { Title, Link, Text } = Typography;

  const getUserDataFromGit = async (name: string) => {
    let response = await fetch(`https://api.github.com/users/${name}`);
    let data = await response.json();
    await setUserData(data);
  };

  useEffect(() => {
    checkRef.on('value', (snapshot) => {
      const users = snapshot.val();
      for (let key in users) {
        // @ts-ignore
        if (users[key].uid === auth.currentUser.uid) {
          setEmail(users[key].email);
          setName(users[key].nickname);
          setUid(users[key].uid);
          setRoles(users[key].roles);
        }
      }
    });
    if (name) {
      getUserDataFromGit(name).catch((e) => new Error(e));
    }
  }, [name]);

  const returnToPage = () => {
    router.push(`../../roles/${roles[0]}`).catch((e) => new Error(e.message));
  };

  return (
    <>
      <MainLayout title={'User'}>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Card bordered={true} className="intro">
                <Avatar size={90} src={userData.avatar_url || '/static/images/king.jpg'} />
                <Title level={2}>{userData.name}</Title>
                <Title level={5}>
                  <Link href={userData.html_url}>
                    <GithubOutlined /> {`@${userData.login}` || 'unknown'}
                  </Link>
                </Title>
                <div>
                  <Text>
                    <EnvironmentOutlined /> {userData.location || 'location'}
                  </Text>
                </div>
                <div>
                  <Text>
                    <MailOutlined /> {userData.email || email}
                  </Text>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[
                  <InfoCircleOutlined key="info-user" />,
                  <span key="span-user-about"> About</span>,
                ]}
                bordered={true}
                key="card-user-about"
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
                  <TagOutlined key="english-user" />,
                  <span key="span-user-english"> Estimated English level</span>,
                ]}
                bordered={true}
                key="card-user-english"
              >
                <Empty
                  description="English level isn't choosen"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[
                  <ReadOutlined key="education-user" />,
                  <span key="span-user-edu"> Education</span>,
                ]}
                bordered={true}
                key="card-user-edu"
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
                  <ContactsOutlined key="contacts-user" />,
                  <span key="span-user-cont"> Contacts</span>,
                ]}
                bordered={true}
                key="card-user-cont"
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
                  <NotificationOutlined key="consents-user" />,
                  <span key="span-user-cons"> Consents</span>,
                ]}
                bordered={true}
                key="card-user-cons"
              >
                <Empty description="Consents" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[
                  <BookOutlined key="statistic-user" />,
                  <span key="span-user-stat"> Student Statistics</span>,
                ]}
                bordered={true}
                key="card-user-stat"
              >
                <Empty description="Statistics" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true} bodyStyle={{ textAlign: 'center' }} key="back">
                <Link onClick={returnToPage}>Return to pages</Link>
              </Card>
            </Col>
          </Row>
        </div>
      </MainLayout>
    </>
  );
};

export default User;
