import React from 'react';
import { Select, Avatar } from 'antd';
import { StudentBasic } from '../../../interfaces/IUser';

const { Option } = Select;

interface PropsStudentList {
  users: StudentBasic[];
  getUser: (value: any) => void;
}

const StudentsList: React.FC<PropsStudentList> = ({ users, getUser }) => {
  const handleUserChange = (value: string) => {
    const user = users.filter((user) => user.name === value);
    getUser(user[0]);
  };
  return (
    <>
      <Select
        placeholder="Select student..."
        style={{ marginLeft: 20, width: 280 }}
        onChange={handleUserChange}
      >
        {users.map((user) => (
          <Option key={user.uid} value={user.name}>
            <Avatar
              size={20}
              src={
                user.avatar_url
                  ? user.avatar_url
                  : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }
            />
            {user.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default StudentsList;
