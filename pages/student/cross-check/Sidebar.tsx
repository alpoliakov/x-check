import React from 'react';
import { Select, Input } from 'antd';

const Sidebar: React.FC = () => {
  const { Option } = Select;
  const data: string[] = ['task1', 'task2', 'task3'];

  const handleClick = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <Select placeholder="Select the task" onChange={handleClick}>
        {data.map((item) => (
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
