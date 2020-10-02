import React from 'react';
import MainLayout from '../../../components/MainLayout';
import Link from 'next/link';
import { CheckCircleTwoTone, CodeTwoTone, HomeTwoTone } from '@ant-design/icons';
import { List } from 'antd';

const StudentPage: React.FC = () => {
  return (
    <MainLayout title={'Student'}>
      <main className={'main__box'}>
        <div className="nav__main">
          <div style={{ marginRight: '20px', width: '220px' }}>
            <List size="small" bordered>
              <List.Item key={'Home'}>
                <Link href={'./student/'}>
                  <div>
                    <HomeTwoTone twoToneColor="#40E127" style={{ marginRight: '4px' }} />
                    <a>Home</a>
                  </div>
                </Link>
              </List.Item>
              <List.Item key={'Cross-check: Submit'}>
                <Link href={'./student/cross-check-submit'}>
                  <div>
                    <CodeTwoTone style={{ marginRight: '4px' }} />
                    <a>Cross-check: Submit</a>
                  </div>
                </Link>
              </List.Item>
              <List.Item key={'Cross-check: Review'}>
                <Link href={'./student/cross-check-review'}>
                  <div>
                    <CheckCircleTwoTone twoToneColor="#eb2f96" style={{ marginRight: '4px' }} />
                    <a>Cross-check: Review</a>
                  </div>
                </Link>
              </List.Item>
            </List>
          </div>
        </div>
        <div className="workspace"></div>
      </main>
    </MainLayout>
  );
};

export default StudentPage;