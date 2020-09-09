import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { checkRef, auth } from '../../firebase';
import { LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Button, Card, Col, Row, Avatar, Typography, Empty } from 'antd';
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
  const { Title, Link, Text } = Typography;

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
      <MainLayout title={'User'}>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Card bordered={true} className="intro">
                <Avatar size={90} src="/static/images/king.jpg" />
                <Title level={2}>{name}</Title>
                <Title level={5}>
                  <Link href="https://github.com/">
                    <GithubOutlined /> githab
                  </Link>
                </Title>
                <div>
                  <Text>
                    <EnvironmentOutlined /> location
                  </Text>
                </div>
                <div>
                  <Text>
                    <MailOutlined /> {email}
                  </Text>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[<InfoCircleOutlined key="info" />, <span> About</span>]}
                bordered={true}
              >
                <Empty
                  description="About info isn't written"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[<TagOutlined key="english" />, <span> Estimated English level</span>]}
                bordered={true}
              >
                <Empty
                  description="English level isn't choosen"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[<ReadOutlined key="english" />, <span> Education</span>]}
                bordered={true}
              >
                <Empty
                  description="Education history isn't filled in"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[<ContactsOutlined key="contacts" />, <span> Contacts</span>]}
                bordered={true}
              >
                <Empty
                  description="Contacts aren't filled in"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[<NotificationOutlined key="consents" />, <span> Consents</span>]}
                bordered={true}
              >
                <Empty description="Consents" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[<BookOutlined key="english" />, <span> Student Statistics</span>]}
                bordered={true}
              >
                <Empty description="Statistics" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true} bodyStyle={{ textAlign: 'center' }}>
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
