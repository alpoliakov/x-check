import React, { useState, useEffect } from 'react';
import { Form, Select, Button, DatePicker } from 'antd';
const { Option } = Select;
import { ICourse } from '../../../interfaces/ICourse';
import moment from 'moment';
import { setDocument } from '../../../services/updateFirebase';

interface PropsCurrentStage {
  activeTask: string | undefined;
  dataSession: ICourse;
  getTaskStage: (value: string | undefined) => void;
  updateDataSession: (data: ICourse, value: string) => void;
}

const CurrentStage: React.FC<PropsCurrentStage> = ({
  activeTask,
  dataSession,
  getTaskStage,
  updateDataSession,
}) => {
  const [currentStage, setCurrentStage] = useState<string | undefined>(undefined);
  const [start, setStart] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<string | null>(null);

  useEffect(() => {
    if (activeTask !== undefined) {
      const active: any = dataSession.tasks.find((e) => e.taskID === activeTask);
      setStart(moment(active.start).format('YYYY-MM-DD'));
      setDeadline(moment(active.deadline).format('YYYY-MM-DD'));
      setCurrentStage(active.taskStage);
    }
  }, [activeTask]);

  const onchangeCurrentStage = (value: string) => {
    setCurrentStage(value);
  };
  const onChangeStart = (date: any, dateString: string) => {
    if (dateString !== '') {
      setStart(dateString);
    } else {
      setStart(null);
    }
  };
  const onchangeDeadline = (date: any, dateString: string) => {
    if (dateString !== '') {
      setDeadline(dateString);
    } else {
      setDeadline(null);
    }
  };
  const onFinish = (): void => {
    const active: any = dataSession.tasks.find((e) => e.taskID === activeTask);
    dataSession.tasks.forEach((e: any) => {
      if (e.name === active.name) {
        e.taskStage = currentStage === null ? e.taskStage : currentStage;
        e.deadline = deadline === null ? e.deadline : moment(deadline).valueOf();
        e.start = start === null ? e.start : moment(start).valueOf();
      }
      return e;
    });
    setDocument('sessions', 'course1', dataSession);
    updateDataSession(dataSession, active.taskID);
    getTaskStage(currentStage);
  };
  return (
    <>
      <Form layout="inline">
        <Form.Item label="Current stage">
          <Select
            value={currentStage}
            disabled={!activeTask}
            onChange={onchangeCurrentStage}
            style={{ width: 220 }}
          >
            <Option value="DRAFT">DRAFT</Option>
            <Option value="REQUESTS_GATHERING">REQUESTS_GATHERING</Option>
            <Option value="CROSS_CHECK">CROSS_CHECK</Option>
            <Option value="COMPLETED">COMPLETED</Option>
            <Option value="ARCHIVED">ARCHIVED</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Start">
          <DatePicker
            disabled={!activeTask}
            value={start !== null ? moment(start, 'YYYY-MM-DD') : null}
            format={'YYYY-MM-DD'}
            onChange={onChangeStart}
          />
        </Form.Item>
        <Form.Item label="Deadline">
          <DatePicker
            disabled={!activeTask}
            value={deadline !== null ? moment(deadline, 'YYYY-MM-DD') : null}
            format={'YYYY-MM-DD'}
            onChange={onchangeDeadline}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" disabled={!activeTask} onClick={onFinish}>
            Change stage
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CurrentStage;
