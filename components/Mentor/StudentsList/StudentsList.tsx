import React, { useState, Key, useEffect } from 'react';
import { Select, Avatar, Form } from 'antd';
import { UserBasic } from '../../../interfaces/IUser';
import AddStudents from './AddStudents';
import { updateObjectField } from '../../../services/updateFirebase';
import firebase from 'firebase';

const { Option } = Select;

interface PropsStudentList {
  userData: UserBasic[];
  myUid: string;
  getTask: (value: any) => void;
}

const StudentsList: React.FC<PropsStudentList> = ({ userData, getTask, myUid }) => {
  const [students, setStudent] = useState<UserBasic[]>([]);
  const [users, setUsers] = useState<UserBasic[]>([]);
  const [tasks, setSTask] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [taskValue, setTaskValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTaskValue(undefined);
    getTask(null);
  }, [tasks]);
  useEffect(() => {
    if (myUid) {
      const mentorStudents: any[] = userData.filter((e: any) => e.uid === myUid)[0].studentsid;
      setStudent(
        mentorStudents.map((e: any) => {
          return userData.filter((i) => e === i.uid)[0];
        })
      );
      setUsers(userData.filter((e) => e.uid !== myUid && !e.mentor));
    }
  }, [myUid]);

  const getUpdate = (value: string) => {
    if (myUid && value) {
      userData.forEach((e: any) => {
        if (e.uid === value) {
          e.mentor = { id: myUid };
          updateObjectField('users', value, { mentor: { id: myUid } });
        }
        if (e.uid === myUid && !e.studentsid.includes(value)) {
          e.studentsid.push(value);
          updateObjectField('users', myUid, {
            studentsid: firebase.firestore.FieldValue.arrayUnion(value),
          });
        }
      });
    }
  };
  const handleProvinceChange = (value: Key, key: any) => {
    const userTasks: UserBasic[] = students.filter((i) => i.uid === key.key);
    setSTask(userTasks[0].tasksID);
    setIsDisabled(false);
  };

  const onSecondCityChange = (value: string) => {
    setTaskValue(value);
    getTask(value);
  };
  return (
    <>
      <AddStudents userData={users} myUid={myUid} getUpdate={getUpdate} />
      <Form layout="vertical">
        <Form.Item label="Students" rules={[{ required: true }]}>
          <Select
            size="small"
            placeholder="Select students..."
            style={{ width: 220 }}
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
            size="small"
            placeholder="Select student tasks..."
            value={taskValue}
            style={{ width: 220, marginRight: 20 }}
            onChange={onSecondCityChange}
            disabled={isDisabled}
          >
            {tasks.map((task) => (
              <Option key={task} value={task}>
                {task}
              </Option>
            ))}
          </Select>{' '}
        </Form.Item>
      </Form>
    </>
  );
};

export default StudentsList;
