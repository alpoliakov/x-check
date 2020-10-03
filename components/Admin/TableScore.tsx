import { Avatar, Space, Table } from 'antd';
import { title } from 'process';
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
  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
  ];
  let obj: any = {};
  for (let i = 0; i < dataTasks.length; i++) {
    columns.push({ title: dataTasks[i].id, dataIndex: dataTasks[i].id, key: i });
    obj[dataTasks[i].id] = 0;
  }
  const datas = [];
  for (let i = 0; i < dataUsers.length; i++) {
    obj = {
      ...obj,
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
    };
    for (const keys in obj) {
      for (let i = 0; i < dataCompletedTask.length; i++) {
        if (keys === dataCompletedTask[i].taskID && obj.key === dataCompletedTask[i].student.id) {
          console.log('111111', obj, (obj[keys] = dataCompletedTask[i].finalScore));
          obj[dataCompletedTask[i].taskID] = dataCompletedTask[i].finalScore;
        }
      }
    }

    datas.push(obj);
  }
  return (
    <>
      <Table columns={columns} dataSource={datas} scroll={{ x: 1300 }} />
    </>
  );
};

export default TableScore;
