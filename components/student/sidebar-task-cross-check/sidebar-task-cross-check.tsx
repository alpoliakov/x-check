import React from 'react';
import { Typography, List } from 'antd';
import Link from 'next/link';
import styles from './sidebar-task-cross-check.module.css';

interface PropsSidebarTask {
  dataCategory: Array<string>;
  nameStudent: string;
}

const SidebarTask: React.FC<PropsSidebarTask> = ({ dataCategory, nameStudent }) => {
  const { Title } = Typography;
  return (
    <div className={styles.sideBar}>
      <Title level={2}>{nameStudent}</Title>
      <List
        bordered
        dataSource={dataCategory}
        renderItem={(item) => (
          <List.Item key={item}>
            <Link href={`./student/${item.toLowerCase().replace(': ', '-')}`}>
              <a>{item}</a>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SidebarTask;
