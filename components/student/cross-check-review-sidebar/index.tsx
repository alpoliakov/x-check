import React, { useState } from 'react';
import { Select, Table, Tag } from 'antd';
import styles from './index.module.css';
import { CheckState, ICheсk, IStudent } from '../../../interfaces/IWorkDone';

interface ISelectTask {
  name: string;
  id: string;
}

interface IStudentStatus {
  student: IStudent;
  status: CheckState;
}
interface PropsSidebar {
  taskList: ISelectTask[];
  isDeadline: boolean;
  students: IStudentStatus[];
  getTask: (task: string) => void;
  selectStudent: (reviewer: IStudent) => void;
}

const SidebarReview: React.FC<PropsSidebar> = ({
  getTask,
  taskList,
  isDeadline,
  students,
  selectStudent,
}) => {
  const { Option } = Select;
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = (value: string) => {
    getTask(value);
    setIsActive(true);
  };

  const onClickStudent = (studentID: string) => {
    const result = students.filter((item) => item.student.id === studentID);
    if (result.length !== 0) {
      selectStudent(result[0].student);
    } else {
      selectStudent({} as IStudent);
    }
  };

  let sideBarJSX: JSX.Element = <></>;
  let itemStatus = '';
  if (isActive && isDeadline && students.length !== 0) {
    const data = students.map((item) => {
      switch (item.status) {
        case CheckState.AuditorDraft:
          itemStatus = 'Auditor Draft';
          break;
        case CheckState.NotVerified:
          itemStatus = 'Not Verified';
          break;
        case CheckState.Verified:
          itemStatus = 'Verified';
          break;
        case CheckState.Dispute:
          itemStatus = 'Dispute';
          break;
        case CheckState.DisputeClosed:
          itemStatus = 'Dispute closed';
          break;
        default:
          itemStatus = 'Auditor Draft';
      }

      return {
        key: item.student.id,
        student: item.student.name,
        status: itemStatus,
      };
    });

    const addLink = (text: string) => {
      return <a>{text}</a>;
    };

    const addTag = (text: string) => {
      let colorTag = 'geekblue';
      switch (text) {
        case 'Auditor Draft':
          colorTag = 'orange';
          break;
        case 'Not Verified':
          colorTag = 'geekblue';
          break;
        case 'Verified':
          colorTag = 'green';
          break;
        case 'Dispute':
          colorTag = 'red';
          break;
        case 'Dispute closed':
          colorTag = 'gold';
          break;
        default:
          colorTag = 'orange';
      }

      return (
        <Tag color={colorTag} key={text}>
          {text}
        </Tag>
      );
    };
    const columns = [
      {
        title: 'Student',
        dataIndex: 'student',
        key: 'student',
        render: addLink,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: addTag,
      },
    ];
    sideBarJSX = (
      <div>
        {
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => {
                  onClickStudent(record.key);
                },
              };
            }}
          />
        }
      </div>
    );
  } else if (isActive && !isDeadline) {
    sideBarJSX = <>Cross-Check did not start! </>;
  } else if (isActive && isDeadline && students.length === 0) {
    sideBarJSX = <>Wait for the distribution of students</>;
  } else if (isActive) {
    sideBarJSX = <>No submit task</>;
  } else {
    sideBarJSX = <></>;
  }

  return (
    <div className={styles.sideBar}>
      <div className={styles.mb5}>
        <Select placeholder="Select the task" style={{ width: '100%' }} onChange={handleClick}>
          {taskList.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
      {sideBarJSX}
    </div>
  );
};

export default SidebarReview;
