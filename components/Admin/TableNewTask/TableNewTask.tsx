/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Table, Radio, Divider, Tag, Button, Popconfirm, Space } from 'antd';
import { ITask, StateTask } from '../../../interfaces/ITask';
import { deleteDocument, setDocument, updateObjectField } from '../../../services/updateFirebase';
import { ICourse } from '../../../interfaces/ICourse';

interface PropsTableNewTask {
  tasks: ITask[];
  dataSession: ICourse;
  getClickTask: (value: string) => void;
  updateDataSession: (data: ICourse, value: string) => void;
}
interface Item {
  key: string;
  id: string;
  name: string;
  state: StateTask;
  authorName: string;
}
const TableNewTask: React.FC<PropsTableNewTask> = ({
  tasks,
  getClickTask,
  dataSession,
  updateDataSession,
}) => {
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

      render: (tags: StateTask) => (
        <>
          <Tag
            color={
              tags === StateTask.published ? 'green' : tags === StateTask.draft ? 'red' : 'geekblue'
            }
          >
            {tags === StateTask.published
              ? 'PUBLISHED'
              : tags === StateTask.draft
              ? 'DRAFT'
              : 'ACTIVE'}
          </Tag>
        </>
      ),
    },
    {
      title: 'Task',
      dataIndex: 'name',
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      render: (text: string) => (
        <Button type="link" onClick={() => getClickTask(text)}>
          {text}
        </Button>
      ),
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
            <Button
              key={text}
              disabled={text.state === StateTask.published || text.state === StateTask.active}
            >
              Published
            </Button>
          </Popconfirm>
          <Popconfirm title="Sure to active?" onConfirm={() => onClickActive(_, text)}>
            <Button key={text} disabled={text.state === StateTask.active}>
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
    const dataSource = [...dataTasks];
    setDataTasks(dataSource.filter((item) => item.id !== _));
    deleteDocument('TasksArray', e.id);
  };
  const onClickPublished = (_: any, e: any) => {
    const dataSource = [...dataTasks];
    setDataTasks(
      dataSource.map((item: Item) => {
        if (item.id === _) {
          item.state = StateTask.active;
        }
        return item;
      })
    );
    updateObjectField('TasksArray', e.id, {
      state: StateTask.published,
    });
  };
  const onClickActive = (_: any, e: any) => {
    const dataSource = [...dataTasks];
    dataSession.tasks.push({
      taskID: e.id,
      name: e.name,
      taskStage: 'DRAFT',
      deadline: Date.now(),
      start: Date.now(),
    });
    const pushBase = dataSession;
    setDocument('sessions', 'course1', dataSession);
    updateDataSession(pushBase, e.id);
    updateObjectField('TasksArray', e.id, {
      state: StateTask.active,
    });
    setDataTasks(
      dataSource.map((item: Item) => {
        if (item.id === _) {
          item.state = StateTask.active;
        }
        return item;
      })
    );
  };

  return (
    <div>
      <Table columns={columns} dataSource={dataTasks} />
    </div>
  );
};

export default TableNewTask;
