import React, { useState, Key, useEffect } from 'react';
import { Select, Avatar, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { MentorBasic, StudentBasic } from '../../interfaces/IUser';
import { ITask } from '../../interfaces/ITask';

const { Option } = Select;

interface PropsStudentList {
  user: MentorBasic;
  data: StudentBasic[];
  getTask: (value: any) => void;
}

const StudentsList: React.FC<PropsStudentList> = ({ user, data, getTask }) => {
  const [students, setStudent] = useState<StudentBasic[]>([]);
  const [tasks, setSTask] = useState<ITask[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [taskValue, setTaskValue] = useState<string | undefined>(undefined);
  const [form] = useForm();

  useEffect(() => {
    const mentorStudents = data.filter((i) => {
      let result: any;
      user.students.forEach((e) => {
        if (i.uid === e) {
          return (result = i);
        }
      });
      return result;
    });
    setStudent(mentorStudents);
  }, []);

  useEffect(() => {
    setTaskValue(undefined);
    getTask(null);
  }, [tasks]);
  const handleProvinceChange = (value: Key, key: any) => {
    const userTasks: any = user.students.filter((i) => i === key.key);
    setSTask(userTasks[0].tasksID);
    setIsDisabled(false);
  };

  const onSecondCityChange = (value: string) => {
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
