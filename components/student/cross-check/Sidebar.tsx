import React from 'react';
import { Select, Input, Table } from 'antd';
import { ITask } from '../../../interfaces/ITask';
import styles from './sidebar.module.css';
interface PropsSidebar {
  taskList: string[];
  isComplited: boolean;
  isDeadline: boolean;
  getTask: (task: string) => void;
}

const Sidebar: React.FC<PropsSidebar> = ({ getTask, taskList, isComplited, isDeadline }) => {
  const { Option } = Select;
  const handleClick = (value: string) => {
    getTask(value);
  };

  const inputs = (
    <div>
      <h3>Solution URL Demo</h3>
      <Input placeholder="Link here" />
      <h3>Solution URL Pull request</h3>
      <Input placeholder="Link here" />
    </div>
  );

  // const table = <div>{<Table columns={columns} dataSource={data} pagination={false} />}</div>;

  return (
    <div className={styles.sideBar}>
      <div className={styles.mb5}>
        <Select placeholder="Select the task" onChange={handleClick}>
          {taskList.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
      {isDeadline ? <></> : inputs}
    </div>
  );
};

export default Sidebar;
