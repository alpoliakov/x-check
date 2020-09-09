import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
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
} from '@ant-design/icons';

const EditUser = () => {
  const { Title, Link, Text } = Typography;
  return (
    <>
      <MainLayout title={'Edit'}>
        <div className="site-card-wrapper">
          <Row gutter={32}>
            <Col span={6}>
              <Card
                bordered={true}
                className="intro"
                actions={[<EditOutlined key="edit" />, <SettingOutlined key="setting" />]}
              >
                <Avatar size={90} src="/static/images/king.jpg" />
                <Title level={2}>Oleksandr Poliakov</Title>
                <Title level={5}>
                  <Link href="https://github.com/">
                    <GithubOutlined /> githab
                  </Link>
                </Title>
                <div>
                  <Text>
                    <EnvironmentOutlined /> Location
                  </Text>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[<InfoCircleOutlined key="info" />, <span> About</span>]}
                bordered={true}
                actions={[<EditOutlined key="edit" />, <SettingOutlined key="setting" />]}
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
                actions={[<EditOutlined key="edit" />, <SettingOutlined key="setting" />]}
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
                actions={[<EditOutlined key="edit" />, <SettingOutlined key="setting" />]}
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
                actions={[<EditOutlined key="edit" />, <SettingOutlined key="setting" />]}
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
                actions={[<EditOutlined key="edit" />]}
              >
                <Empty description="Consents" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={[<BookOutlined key="english" />, <span> Student Statistics</span>]}
                bordered={true}
                actions={[<SettingOutlined key="setting" />]}
              >
                <Empty description="Statistics" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true} bodyStyle={{ textAlign: 'center' }}>
                <Link>Return to pages</Link>
              </Card>
            </Col>
          </Row>
        </div>
      </MainLayout>
    </>
  );
};

export default EditUser;
