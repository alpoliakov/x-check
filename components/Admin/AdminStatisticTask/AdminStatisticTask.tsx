import React, { useState, Key, useEffect, Props } from 'react';
import { Card } from 'antd';
import { IStatistics } from '../../../interfaces/IStatistics';
import { UserBasic } from '../../../interfaces/IUser';
import { IWorkDone } from '../../../interfaces/IWorkDone';

interface IProps {
  user: UserBasic[];
  dataCompletedTask: IWorkDone[];
  activeTask: string | undefined;
}
const AdminStatisticTask: React.FC<IProps> = ({ user, dataCompletedTask, activeTask }) => {
  const [users, setUsers] = useState<any[]>(user);
  const [students, setStudent] = useState<number>(0);
  const [workDone, setWorkDone] = useState<number>(0);
  const [workInCheck, setWorkInCheck] = useState<number>(0);
  const [completedCheck, setCompletedCheck] = useState<number>(0);
  const [workWithoutAReviewer, setWorkWithoutAReviewer] = useState<number>(0);

  useEffect(() => {
    setUsers(user);
    setStudent(getNumberStudents(users));
  }, [user, users]);
  useEffect(() => {
    setWorkDone(getWorkDone(dataCompletedTask, activeTask));
  }, [activeTask]);
  const getNumberStudents = (value: any): number => {
    let result = 0;
    Object.entries(value).forEach(([key, value]) => {
      const numberStudents: any = value;
      if (numberStudents.roles.includes('student')) {
        result += 1;
      }
    });
    return result;
  };

  const getWorkDone = (array: IWorkDone[], task: string | undefined): number => {
    let result = 0;
    array.forEach((e) => {
      if (e.taskID === task) {
        result += 1;
      }
    });
    return result;
  };
  return (
    <>
      <Card title="Statistic" style={{ width: 300 }}>
        <p style={{ marginBottom: 7 }}>
          Number students:<b style={{ marginLeft: 20 }}>{students}</b>
        </p>
        <p style={{ marginBottom: 7 }}>
          Works delivered: <b style={{ marginLeft: 20 }}>{workDone}</b>
        </p>
        <p style={{ marginBottom: 7 }}>
          Verified works: <b style={{ marginLeft: 20 }}>{workInCheck}</b>
        </p>
        <p style={{ marginBottom: 7 }}>
          Distributed for inspection: <b style={{ marginLeft: 20 }}>{completedCheck}</b>
        </p>
        <p style={{ marginBottom: 7 }}>
          Unallocated works: <b style={{ marginLeft: 20 }}>{workWithoutAReviewer}</b>
        </p>
      </Card>
    </>
  );
};

export default AdminStatisticTask;
