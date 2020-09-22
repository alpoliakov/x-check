/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Table, Radio, Divider, Tag, Button, Popconfirm, Space } from 'antd';
import { ITask } from '../../../interfaces/ITask';
import { ICourse } from '../../../interfaces/ICourse';

interface AProps {
  tasks: any[];
  course: ICourse;
}
interface Item {
  key: string;
  id: string;
  name: string;
  state: string;
  authorName: string;
}
/* const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: { name: string }) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
}; */

const TableNewTask: React.FC<AProps> = ({ tasks, course }) => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const data: any = [];
  for (let i = 0; i < tasks.length; i++) {
    data.push({
      key: i,
      id: tasks[i].id,
      name: tasks[i].name,
      state: tasks[i].state,
      authorName: tasks[i].authorName,
    });
  }
  const [dataTasks, setDataTasks] = useState(data);
  const columns = [
    {
      title: 'State',
      dataIndex: 'state',

      render: (tags: string) => (
        <>
          <Tag color={tags === 'published' ? 'green' : tags === 'draft' ? 'red' : 'geekblue'}>
            {tags}
          </Tag>
        </>
      ),
    },
    {
      title: 'Task',
      dataIndex: 'name',
      render: (text: React.ReactNode) => <a href="/">{text}</a>,
    },
    {
      title: 'Author',
      dataIndex: 'authorName',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (_: any, text: any) => (
        <Space size="middle">
          <Popconfirm title="Sure to published?" onConfirm={() => onClickPublished(_, text)}>
            <Button key={text} disabled={text.state === 'published' || text.state === 'active'}>
              Published
            </Button>
          </Popconfirm>
          <Popconfirm title="Sure to active?" onConfirm={() => onClickActive(_, text)}>
            <Button key={text} disabled={text.state === 'active'}>
              Active
            </Button>
          </Popconfirm>
          <Popconfirm title="Sure to delete?" onConfirm={() => onClickDelete(_, text)}>
            <Button type="dashed" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const onClickDelete = (_: any, e: any) => {
    console.log('delete', e);
    const dataSource = [...dataTasks];
    setDataTasks(dataSource.filter((item) => item.id !== _));
  };
  const onClickPublished = (_: any, e: any) => {
    console.log(_, e);
    const dataSource = [...dataTasks];
    setDataTasks(
      dataSource.map((item: Item) => {
        if (item.id === _) {
          item.state = 'published';
        }
        return item;
      })
    );
  };
  const onClickActive = (_: any, e: any) => {
    console.log(_, e);
    const dataSource = [...dataTasks];
    course.tasks.push({
      taskID: e.id,
      name: e.name,
      taskStage: null,
      deadline: null,
      start: null,
    });
    setDataTasks(
      dataSource.map((item: Item) => {
        if (item.id === _) {
          item.state = 'active';
        }
        return item;
      })
    );
  };

  return (
    <div>
      <Table
        /*   rowSelection={{
          ...rowSelection,
        }} */
        columns={columns}
        dataSource={dataTasks}
      />
    </div>
  );
};

export default TableNewTask;
