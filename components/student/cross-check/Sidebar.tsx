import React from 'react';
import { Select, Input, Table } from 'antd';

interface PropsSidebar {
  taskList: string[];
  isDeadline: boolean;
  getTask: (value: string) => void;
}

const Sidebar: React.FC<PropsSidebar> = ({ getTask, taskList, isDeadline }) => {
  const { Option } = Select;

  const columns = [
    {
      title: 'Reviewers',
      dataIndex: 'Reviewers',
      key: 'Reviewers',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
  ];

  const data = [
    {
      key: '1',
      Reviewers: 'Reviewer 1',
      Status: 'Draft',
    },
    {
      key: '2',
      Reviewers: 'Reviewer 2',
      Status: 'Accepted',
    },
    {
      key: '3',
      Reviewers: 'Reviewer 3',
      Status: 'Disputed',
    },
  ];

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

  const table = (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );

  return (
    <div>
      <div>
        <Select placeholder="Select the task" onChange={handleClick}>
          {taskList.map((item) => (
            <Option key={item} value={`${item}`}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
      {isDeadline ? table : inputs}
    </div>
  );
};

export default Sidebar;
