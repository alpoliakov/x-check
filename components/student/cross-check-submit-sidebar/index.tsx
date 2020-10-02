import React, { useState } from 'react';
import { Select, Input, Table, Tag } from 'antd';
import { ITask, TypeTask } from '../../../interfaces/ITask';
import styles from './index.module.css';
import { CheckState, IStudent, IWorkDone, TaskState, IMentor } from '../../../interfaces/IWorkDone';

interface ISelectTask {
  name: string;
  id: string;
}
interface PropsSidebar {
  taskList: ISelectTask[];
  isDeadline: boolean;
  isActiveTask: boolean;
  workDone: IWorkDone;
  deployUrl: string;
  sourceGithubRepoUrl: string;
  getTask: (task: string) => void;
  getDeployUrl: (url: string) => void;
  getSourceGithubRepoUrl: (url: string) => void;
  selectReviewer: (reviewer: IStudent | IMentor) => void;
}

const SidebarSubmit: React.FC<PropsSidebar> = ({
  getTask,
  isActiveTask,
  taskList,
  workDone,
  isDeadline,
  deployUrl,

  sourceGithubRepoUrl,
  getDeployUrl,
  getSourceGithubRepoUrl,
  selectReviewer,
}) => {
  const { Option } = Select;

  const handleClick = (value: string) => {
    getTask(value);
  };
  console.log(isActiveTask);
  console.log(isDeadline);
  const onChangeDeployUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    getDeployUrl(e.target.value);
  };
  const onChangeSourceGithubRepoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    getSourceGithubRepoUrl(e.target.value);
  };

  const onClickRevewers = (reviewerID: string) => {
    const result = workDone.reviewers.filter((item) => item.id === reviewerID);
    if (result.length !== 0) {
      selectReviewer(result[0]);
    } else {
      if (workDone.mentor.id !== undefined) {
        selectReviewer(workDone.mentor);
      } else {
        selectReviewer({} as IStudent);
      }
    }
  };

  let sideBarJSX: JSX.Element = <></>;
  let itemStatus = '';
  if (!isActiveTask && !isDeadline && workDone.id === undefined) {
    sideBarJSX = <></>;
  } else if (isActiveTask && isDeadline && workDone.id === undefined) {
    sideBarJSX = <>The deadline has passed already</>;
  } else if (workDone.state === TaskState.isCheking && !isDeadline) {
    sideBarJSX = <></>;
  } else if (isActiveTask && !isDeadline && workDone.id === undefined) {
    sideBarJSX = (
      <div>
        <h3>Solution URL Demo</h3>
        <Input placeholder="Link here" value={deployUrl} allowClear onChange={onChangeDeployUrl} />
        <h3>Solution URL Pull request</h3>
        <Input
          placeholder="Link here"
          value={sourceGithubRepoUrl}
          allowClear
          onChange={onChangeSourceGithubRepoUrl}
        />
      </div>
    );
  } else if (isDeadline && workDone.id !== undefined) {
    const data = workDone.reviewers.map((item, index) => {
      let isAnonimSidebar: boolean;
      const stateItem = workDone.cheсks.filter((itemChecks) => itemChecks.checkerID === item.id);
      if (stateItem.length !== 0) {
        switch (stateItem[0].state) {
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
        isAnonimSidebar = stateItem[0].isAnonim;
      } else {
        isAnonimSidebar = false;
        itemStatus = 'Auditor Draft';
      }
      if (isAnonimSidebar) {
        return {
          key: item.id,
          reviewer: item.name,
          status: itemStatus,
        };
      }
      return {
        key: item.id,
        reviewer: `Reveiwer ${index + 1}`,
        status: itemStatus,
      };
    });
    const statusMentor =
      workDone.mentorCheck.state !== undefined
        ? workDone.mentorCheck.state
        : CheckState.AuditorDraft;
    const dataWithMentor =
      workDone.mentor.id !== undefined
        ? [
            ...data,
            {
              key: workDone.mentor.id,
              reviewer: workDone.mentor.name,
              status: statusMentor,
            },
          ]
        : data;
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
        title: 'Reviewer',
        dataIndex: 'reviewer',
        key: 'reviewer',
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
            dataSource={dataWithMentor}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => {
                  onClickRevewers(record.key);
                },
              };
            }}
          />
        }
      </div>
    );
  } else {
    sideBarJSX = (
      <div>
        <h3>Solution URL Demo</h3>
        <Input placeholder="Link here" value={deployUrl} allowClear onChange={onChangeDeployUrl} />
        <h3>Solution URL Pull request</h3>
        <Input
          placeholder="Link here"
          value={sourceGithubRepoUrl}
          allowClear
          onChange={onChangeSourceGithubRepoUrl}
        />
      </div>
    );
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

export default SidebarSubmit;
