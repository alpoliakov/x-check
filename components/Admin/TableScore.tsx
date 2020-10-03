import { Avatar, Space, Table } from 'antd';
import React, { useState } from 'react';
import { ICourse } from '../../interfaces/ICourse';
import { ITask } from '../../interfaces/ITask';
import { UserBasic } from '../../interfaces/IUser';
import { IWorkDone } from '../../interfaces/IWorkDone';

interface PropsScore {
  dataUsers: UserBasic[];
  dataTasks: ITask[];
  dataCompletedTask: IWorkDone[];
}
const TableScore: React.FC<PropsScore> = ({ dataUsers, dataTasks, dataCompletedTask }) => {
  const datas = [];
  for (let i = 0; i < dataUsers.length; i++) {
    const obj = {
      key: dataUsers[i].uid,
      name: (
        <Space>
          <Avatar
            size={20}
            src={
              dataUsers[i].avatar_url
                ? dataUsers[i].avatar_url
                : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            }
          />
          {dataUsers[i].nickname}
        </Space>
      ),

      score: 0,
    };
    datas.push(obj);
  }
  for (let i = 0; i < datas.length; i++) {}
  const task = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
  ];
  for (let i = 0; i < dataTasks.length; i++) {
    task.push({ title: dataTasks[i].id, dataIndex: 'score', key: i });
  }
  console.log(task);
  return (
    <>
      <Table columns={task} dataSource={datas} scroll={{ x: 1300 }} />
    </>
  );
};

export default TableScore;
