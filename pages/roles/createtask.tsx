import React, { useState }  from 'react';
import MainLayout from '../../components/MainLayout';
import Myform from '../../components/Form';
import { List, Select } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface PropsStudent {
  changeAuthorization: () => void;
}

const CreateTaskPage: React.FC<PropsStudent> = ({ changeAuthorization }) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <>
      <MainLayout title="Create tasks" changeAuthorization={changeAuthorization}>
        <div className="ant-row">
          <div className="ant-col ant-col-4"> 
            <div className="tasks">
              <Select defaultValue="Task1" style={{ width: 234 }}>
                <Select.Option value="task1">Task1</Select.Option>
                <Select.Option value="task2">Task2</Select.Option>
              </Select>
            </div>
            <div className="ant-col ant-col-24">
              <List className="ant-list ant-list-sm ant-list-split ant-list-bordered" >
                <List.Item>
                  <a onClick={() => setShowButton (true)}>Create a new task</a>
                </List.Item>
              </List>
            </div>
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

export default CreateTaskPage;
