import React from 'react';
import MainLayout from '../../../components/MainLayout';
import { Row, Col } from 'antd';
import Sidebar from '../../../components/student/cross-check/Sidebar';

interface PropsStudent {
  changeAuthorization: () => void;
}

const CrossCheckPage: React.FC<PropsStudent> = ({ changeAuthorization }) => {
  return (
    <>
      <MainLayout title="Student" changeAuthorization={changeAuthorization}>
        <Row gutter={6}>
          <Col>
            <Sidebar />
          </Col>
          <Col />
        </Row>
      </MainLayout>
    </>
  );
};

export default CrossCheckPage;
