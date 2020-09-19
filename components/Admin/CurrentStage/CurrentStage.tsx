import React, { useState, Key, useEffect, Props } from 'react';
import { Row, Col, Form, Select, Avatar, Button, DatePicker } from 'antd';
const { Option } = Select;

const CurrentStage: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<string | null>(null);
  const [start, setStart] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<string | null>(null);

  const onchangeCurrentStage = (value: string) => {
    setCurrentStage(value);
  };
  const onchangeStart = (date: any, dateString: string) => {
    setStart(dateString);
  };
  const onchangeDeadline = (date: any, dateString: string) => {
    setDeadline(dateString);
  };
  const onFinish = (): void => {
    console.log(currentStage, start, deadline);
  };
  return (
    <>
      <Form layout="inline">
        <Form.Item label="Current stage">
          <Select onChange={onchangeCurrentStage} style={{ width: 220 }}>
            <Option value="DRAFT">DRAFT</Option>
            <Option value="REQUESTS_GATHERING">REQUESTS_GATHERING</Option>
            <Option value="CROSS_CHECK">CROSS_CHECK</Option>
            <Option value="COMPLETED<">COMPLETED</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Start">
          <DatePicker onChange={onchangeStart} />
        </Form.Item>
        <Form.Item label="Deadline">
          <DatePicker onChange={onchangeDeadline} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onFinish}>
            Change stage
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CurrentStage;
