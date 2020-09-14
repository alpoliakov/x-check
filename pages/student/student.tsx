import React from 'react';
import MainLayout from '../../components/MainLayout';
import { List } from 'antd';

// interface PropsStudent {
//   changeAuthorization: () => void;
// }

const StudentPage: React.FC = () => {
  const data: Array<string> = ['Cross-check', 'Tasks'];

  return (
    <>
      <h1>Student Page</h1>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item}>
            <a href={`./student/${item.toLowerCase()}`}>{item}</a>
          </List.Item>
        )}
      />
    </>
  );
};

export default StudentPage;
