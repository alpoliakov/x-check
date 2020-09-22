import React, { useState, useEffect } from 'react';
import { Form, Select, Button, DatePicker } from 'antd';
const { Option } = Select;
import { ITask } from '../../../interfaces/ITask';
import { ICourse } from '../../../interfaces/ICourse';
import { ITaskStep } from '../../../interfaces/ICourse';
import moment from 'moment';

interface PropsCurrentStage {
  activeTask: string | undefined;
  course: ICourse;
  getTaskStage: (value: string | undefined) => void;
}

const CurrentStage: React.FC<PropsCurrentStage> = ({ activeTask, course, getTaskStage }) => {
  const [currentStage, setCurrentStage] = useState<string | undefined>(undefined);
  const [start, setStart] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<string | null>(null);

  useEffect(() => {
    if (activeTask !== undefined) {
      const active: any = course.tasks.find((e) => e.name === activeTask);
      setStart(active.start);
      setDeadline(active.deadline);
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
    const active: any = course.tasks.find((e) => e.name === activeTask);
    active.taskStage = currentStage;
    active.start = start;
    active.deadline = deadline;
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
          </Select>
        </Form.Item>
        <Form.Item label="Start">
          <DatePicker
            disabled={!activeTask}
            value={start !== null ? moment(start, 'YYYY-MM-DD') : null}
            onChange={onChangeStart}
          />
        </Form.Item>
        <Form.Item label="Deadline">
          <DatePicker
            disabled={!activeTask}
            value={deadline !== null ? moment(deadline, 'YYYY-MM-DD') : null}
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
