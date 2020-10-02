import React from 'react';
import { Typography, List } from 'antd';
import Link from 'next/link';
import styles from './sidebar-task-cross-check.module.css';
import { studentNav } from '../../../constants/menyData';
import { CheckCircleTwoTone, CodeTwoTone, HomeTwoTone } from '@ant-design/icons';

interface PropsSidebarTask {
  dataCategory: Array<string>;
  nameStudent: string;
  role: string;
}
const SidebarTask: React.FC<PropsSidebarTask> = ({ dataCategory, nameStudent, role }) => {
  const { Title } = Typography;
  const getLink = (role: string, item: string): string => {
    const link =
      item === 'Home' ? `./${role}/` : `./${role}/${item.toLowerCase().replace(': ', '-')}`;
    return link;
  };

  return (
    <div className={styles.sideBar}>
      <List size="small" bordered dataSource={dataCategory}>
        <List.Item key={'Home'}>
          <Link href={'./student/'}>
            <div>
              <HomeTwoTone twoToneColor="#40E127" style={{ marginRight: '4px' }} />
              <a>Home</a>
            </div>
          </Link>
        </List.Item>
        <List.Item key={'Cross-check: Submit'}>
          <Link href={'./student/'}>
            <div>
              <CodeTwoTone style={{ marginRight: '4px' }} />
              <a>Cross-check: Submit</a>
            </div>
          </Link>
        </List.Item>
        <List.Item key={'Cross-check: Review'}>
          <Link href={'./student/'}>
            <div>
              <CheckCircleTwoTone twoToneColor="#eb2f96" style={{ marginRight: '4px' }} />
              <a>Cross-check: Review</a>
            </div>
          </Link>
        </List.Item>
      </List>
    </div>
  );
};

export default SidebarTask;
