import React from 'react';
import MainLayout from '../../components/MainLayout';

interface PropsMainPage {
  changeAuthorization: () => void;
}

const MainPages: React.FC<PropsMainPage> = ({ changeAuthorization }) => {
  return (
    <>
      <MainLayout title={`main: choice a role`} changeAuthorization={changeAuthorization}>
        <main className={'main__box'}>
          <div className="nav__main">
            <div style={{ width: '240px' }}></div>
          </div>
          <div className="workspace"></div>
        </main>
      </MainLayout>
    </>
  );
};

export default MainPages;
