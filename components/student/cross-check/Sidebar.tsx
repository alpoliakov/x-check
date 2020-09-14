import React from 'react';
import { Select, Input } from 'antd';

interface PropsSidebar {
  taskList: string[];
  getTask: (value: string) => void;
}

const Sidebar: React.FC<PropsSidebar> = ({ getTask, taskList }) => {
  const { Option } = Select;

  const handleClick = (value: string) => {
    getTask(value);
  };

  return (
    <>
      <Select placeholder="Select the task" onChange={handleClick}>
        {taskList.map((item) => (
          <Option key={item} value={`${item}`}>
            {item}
          </Option>
        ))}
      </Select>
      <h3>Solution URL Demo</h3>
      <Input placeholder="Link here" />
      <h3>Solution URL Pull request</h3>
      <Input placeholder="Link here" />
    </>
  );
};

export default Sidebar;
