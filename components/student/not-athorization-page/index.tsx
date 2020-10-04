import React from 'react';
import { Typography } from 'antd';
import Link from 'next/link';
import styles from './index.module.css';

const NotAuthPage: React.FC = () => {
  const { Title } = Typography;
  return (
    <div className={styles.notAuthPage}>
      <div>
        <Title>Not Authorization</Title>
        <Link href={`/`}>
          <a>Back in Main page</a>
        </Link>
      </div>
    </div>
  );
};

export default NotAuthPage;
