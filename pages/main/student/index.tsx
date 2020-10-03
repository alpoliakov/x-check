import React, { useState } from 'react';
import MainLayout from '../../../components/MainLayout';
import { CheckCircleTwoTone, CodeTwoTone, HomeTwoTone } from '@ant-design/icons';
import { List } from 'antd';
import StudentHome from '../../../components/student/student-houm/StudentHome';
import CrossCheckSubmitPage from './cross-check-submit';
import CrossCheckReviewPage from './cross-check-review';

const StudentPage: React.FC = () => {
  const [houmPage, setHoumPage] = useState<boolean>(true);
  const [CCSubmit, setCCSubmit] = useState<boolean>(false);

  const goToHoum = () => {
    setHoumPage(true);
    setCCSubmit(false);
  };
  const goToCCSubmit = () => {
    setCCSubmit(true);
    setHoumPage(false);
  };
  const goToCCReview = () => {
    setHoumPage(false);
    setCCSubmit(false);
  };
  return (
    <MainLayout title={'Student'}>
      <main className={'main__box'}>
        <div className="nav__main">
          <div style={{ marginRight: '20px', width: '220px' }}>
            <List size="small" bordered>
              <List.Item key={'Home'} onClick={goToHoum}>
                <div>
                  <HomeTwoTone twoToneColor="#40E127" style={{ marginRight: '4px' }} />
                  <a>Home</a>
                </div>
              </List.Item>
              <List.Item key={'Cross-check: Submit'} onClick={goToCCSubmit}>
                <div>
                  <CodeTwoTone style={{ marginRight: '4px' }} />
                  <a>Cross-check: Submit</a>
                </div>
              </List.Item>
              <List.Item key={'Cross-check: Review'} onClick={goToCCReview}>
                <div>
                  <CheckCircleTwoTone twoToneColor="#eb2f96" style={{ marginRight: '4px' }} />
                  <a>Cross-check: Review</a>
                </div>
              </List.Item>
            </List>
          </div>
        </div>
        <div className="workspace">
          {houmPage ? (
            <StudentHome />
          ) : CCSubmit ? (
            <CrossCheckSubmitPage />
          ) : (
            <CrossCheckReviewPage />
          )}
        </div>
      </main>
    </MainLayout>
  );
};

export default StudentPage;