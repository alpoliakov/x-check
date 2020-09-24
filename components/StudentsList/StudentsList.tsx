import React, { useState, Key, useEffect } from 'react';
import { Select, Avatar, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import Link from 'next/link';
import { MentorBasic } from '../../interfaces/IUser';
import { task } from '../../db/tasks';

const { Option } = Select;
type tplotOptions = {
  [key: string]: any;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface PropsStudentList {
  user: MentorBasic;
  data: [];
  getTask: (value: any) => void;
}

const StudentsList: React.FC<PropsStudentList> = ({ user, data, getTask }) => {
  const [students, setStudent] = useState([]);
  const [tasks, setSTask] = useState<any>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [taskValue, setTaskValue] = useState<any>(null);
  const [form] = useForm();

  useEffect(() => {
    const mentorStudents = data.filter((i: any) => {
      let result: any;
      user.students.forEach((e) => {
        if (i.uid === e.id) {
          return (result = i);
        }
      });
      return result;
    });
    setStudent(mentorStudents);
  }, []);

  useEffect(() => {
    setTaskValue(null);
    getTask(null);
  }, [tasks]);
  const handleProvinceChange = (value: Key, key: any) => {
    const userTasks: any = user.students.filter((i) => i.id === key.key);
    setSTask(userTasks[0].tasksID);
    setIsDisabled(false);
  };

  const onSecondCityChange = (value: Key) => {
    setTaskValue(value);
    getTask(value);
  };
  return (
    <>
      <Form layout="vertical">
        <Form.Item name="Students" label="Students" rules={[{ required: true }]}>
          <Select
            placeholder="Select students..."
            style={{ width: 280 }}
            onChange={handleProvinceChange}
          >
            {students.map((province) => (
              <Option key={province.uid} value={province.name}>
                <Avatar
                  size={20}
                  src={
                    province.avatar_url
                      ? province.avatar_url
                      : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                  }
                />
                {'  '}
                {province.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Tasks" label="Tasks" rules={[{ required: true }]}>
          <Select
            placeholder="Select student tasks..."
            value={taskValue}
            style={{ width: 280, marginRight: 20 }}
            onChange={onSecondCityChange}
            disabled={isDisabled}
          >
            {tasks.map((i: any) => (
              <Option key={i.taskID} value={i.taskName}>
                {i.taskName}
              </Option>
            ))}
          </Select>{' '}
        </Form.Item>
      </Form>
    </>
  );
};

export default StudentsList;
