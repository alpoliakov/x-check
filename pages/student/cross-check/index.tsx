import React from 'react';
import MainLayout from '../../../components/MainLayout';
import { Row, Col, Select, Input } from 'antd';

interface PropsStudent {
  changeAuthorization: () => void;
}

const CrossCheckPage: React.FC<PropsStudent> = ({ changeAuthorization }) => {
  const { Option } = Select;
  const data: string[] = ['task1', 'task2', 'task3'];

  return (
    <>
      <MainLayout title="Student" changeAuthorization={changeAuthorization}>
        <Row gutter={6}>
          <Col>
            <Select placeholder="Select the task" style={{ width: '100%' }}>
              {data.map((item) => (
                <Option key={item} value={`${item}`}>
                  {item}
                </Option>
              ))}
            </Select>
            <h3>Solution URL Demo</h3>
            <Input placeholder="Link here" />
            <h3>Solution URL Pull request</h3>
            <Input placeholder="Link here" />
          </Col>
          <Col />
        </Row>
      </MainLayout>
    </>
  );
};

export default CrossCheckPage;
