import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import Myform from '../../components/Form';
import { List } from 'antd';
import Link from 'next/link';

interface PropsStudent {
  changeAuthorization: () => void;
}

const StudentPage: React.FC<PropsStudent> = ({ changeAuthorization }) => {
  const data: Array<string> = ['Cross-check', 'Tasks', 'Create tasks'];
  const [showButton, setShowButton] = useState(false);

  return (
    <>
      <MainLayout title="Student" changeAuthorization={changeAuthorization}>
        <h1>Student Page</h1>
        <div className="ant-row">
          <div className="ant-col ant-col-4">
        <List className="ant-list ant-list-sm ant-list-split ant-list-bordered"
          
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item}>
              {/*<Link href={`/${item.toLowerCase().replace(/\s+/g,'')}`}>*/}
                <a onClick={() => setShowButton (true)}>{item}</a>
              {/*</Link>*/}
             
            </List.Item>
           )}
          />
          </div>
         {showButton ? (
            <div className="ant-col ant-col-16">
              <Myform id='' name='Task' state='draft' description='' maxScore={300} checkingType='crossCheck'  />
            </div>
          ) : null}
           </div>
      </MainLayout>
    </>
  );
};

export default StudentPage;
