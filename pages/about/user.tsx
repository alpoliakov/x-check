import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { auth, db } from '../../firebase';
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
  data?: any;
}

const User: React.FC<PropsUser> = ({ data }) => {
  const [userData, setUserData] = useState({
    avatar_url: '',
    html_url: '',
    location: '',
    login: '',
    name: '',
    email: '',
  });

  const router = useRouter();
  const { Title, Link, Text } = Typography;
  // @ts-ignore
  const email = auth.currentUser.email;

  const setDataUser = () => {
    // @ts-ignore
    data.forEach((item) => {
      // @ts-ignore
      if (item.uid === auth.currentUser.uid) {
        return setUserData(item);
      }
    });
  };

  useEffect(() => {
    setDataUser();
  }, [data]);

  const returnToPage = () => {
    router.push(`/main`).catch((e) => new Error(e.message));
  };

  // @ts-ignore
  if (!data.length) {
    return (
      <>
        <MainLayout>
          <p>Loading...</p>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <MainLayout title={`user profile ${userData.name}`}>
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
                  description="English level isn't chosen"
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

export const getServerSideProps = async () => {
  let data: any | undefined = [];
  await db
    .collection('users')
    .get()
    .then((snap) => {
      data = snap.docs.map((doc) => doc.data());
    });
  return {
    props: { data },
  };
};

export default User;
