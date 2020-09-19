/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Table, Radio, Divider, Tag, Button, Popconfirm } from 'antd';
import { ITask } from '../../interfaces/ITask';

interface AProps {
  data: any[];
}

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: { name: string }) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const TableNewTask: React.FC<AProps> = ({ data }) => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [dataTasks, setDataTasks] = useState(data);
  const columns = [
    {
      title: 'State',
      dataIndex: 'state',
      // eslint-disable-next-line react/display-name
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
      // eslint-disable-next-line react/display-name
      render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: 'Author',
      dataIndex: 'authorName',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text: React.ReactNode) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => onClickDelete(text)}>
          <Button type="dashed" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const onClickDelete = (e: any) => {
    console.log('delete', e);
    const dataSource = [...dataTasks];
    setDataTasks(dataSource.filter((item) => item.id !== e));
  };
  return (
    <div>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataTasks}
      />
    </div>
  );
};

export default TableNewTask;
