import React, { useState, Key, useEffect } from 'react';
import { Select, Avatar, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { MentorBasic, StudentBasic, UserBasic } from '../../../interfaces/IUser';
import { ITask } from '../../../interfaces/ITask';

const { Option } = Select;

interface PropsStudentList {
  user: [];
  myUid: string;
  getTask: (value: any) => void;
}

const StudentsList: React.FC<PropsStudentList> = ({ user, getTask, myUid }) => {
  const [students, setStudent] = useState<StudentBasic[]>([]);
  const [tasks, setSTask] = useState<ITask[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [taskValue, setTaskValue] = useState<string | undefined>(undefined);
  const [form] = useForm();
  useEffect(() => {
    setStudent(user.filter((e: any) => e.uid !== myUid));
  }, [myUid]);

  useEffect(() => {
    setTaskValue(undefined);
    getTask(null);
  }, [tasks]);
  const handleProvinceChange = (value: Key, key: any) => {
    const userTasks: any = students.filter((i) => i.uid === key.key);
    setSTask(userTasks);
    setIsDisabled(false);
  };

  const onSecondCityChange = (value: string) => {
    setTaskValue(value);
    getTask(value);
  };
  return (
    <>
      <Form layout="vertical">
        <Form.Item label="Students" rules={[{ required: true }]}>
          <Select
            placeholder="Select students..."
            style={{ width: 280 }}
            onChange={handleProvinceChange}
          >
            {students.map((province) => (
              <Option key={province.uid} value={province.nickname}>
                <Avatar
                  size={20}
                  src={
                    province.avatar_url
                      ? province.avatar_url
                      : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                  }
                />
                {'  '}
                {province.nickname}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Tasks" rules={[{ required: true }]}>
          <Select
            placeholder="Select student tasks..."
            value={taskValue}
            style={{ width: 280, marginRight: 20 }}
            onChange={onSecondCityChange}
            disabled={isDisabled}
          >
            {tasks.map((task: any, i) => (
              <Option key={i} value={task.taskName}>
                {task.taskName}
              </Option>
            ))}
          </Select>{' '}
        </Form.Item>
      </Form>
    </>
  );
};

export default StudentsList;
