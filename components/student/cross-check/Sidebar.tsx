import React, { useState } from 'react';
import { Select, Input, Table, Tag } from 'antd';
import { ITask } from '../../../interfaces/ITask';
import styles from './sidebar.module.css';
import { CheckState, IStudent, IWorkDone } from '../../../interfaces/IWorkDone';

interface ISelectTask {
  name: string;
  id: string;
}
interface PropsSidebar {
  taskList: ISelectTask[];
  isDeadline: boolean;
  workDone: IWorkDone;
  reviewer: IStudent;
  deployUrl: string;
  sourceGithubRepoUrl: string;
  getTask: (task: string) => void;
  getDeployUrl: (url: string) => void;
  getSourceGithubRepoUrl: (url: string) => void;
  selectReviewer: (reviewer: IStudent) => void;
}

const Sidebar: React.FC<PropsSidebar> = ({
  getTask,
  taskList,
  workDone,
  isDeadline,
  deployUrl,
  reviewer,
  sourceGithubRepoUrl,
  getDeployUrl,
  getSourceGithubRepoUrl,
  selectReviewer,
}) => {
  const { Option } = Select;

  const handleClick = (value: string) => {
    getTask(value);
  };

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
      selectReviewer({} as IStudent);
    }
  };

  let sideBarJSX: JSX.Element = <></>;
  let colorTag = 'geekblue';
  let itemStatus = '';
  if (!isDeadline && workDone.id === undefined && reviewer.id === undefined) {
    sideBarJSX = <></>;
  } else if (isDeadline && workDone.id === undefined) {
    sideBarJSX = <>Работа не сабмитнута в указанные сроки</>;
  } else if (!isDeadline && workDone.id === undefined && reviewer.id !== undefined) {
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
      const stateItem = workDone.cheсks.filter((itemChecks) => itemChecks.checkerID === item.id);
      if (stateItem.length !== 0) {
        switch (stateItem[0].state) {
          case CheckState.NotVerified:
            colorTag = 'geekblue';
            itemStatus = 'Not Verified';
            break;
          case CheckState.AuditorDraft:
            colorTag = 'geekblue';
            itemStatus = 'Auditor Draft';
            break;
          case CheckState.Verified:
            colorTag = 'green';
            itemStatus = 'Verified';
            break;
          case CheckState.Dispute:
            colorTag = 'red';
            itemStatus = 'Dispute';
            break;
          case CheckState.DisputeClosed:
            colorTag = 'gold';
            itemStatus = 'Dispute closed';
            break;
          default:
            colorTag = 'blue';
            itemStatus = 'Dispute closed';
        }
      } else {
        colorTag = 'geekblue';
        itemStatus = 'Auditor Draft';
      }
      return {
        key: item.id,
        reviewer: `Reveiwer ${index}`,
        status: itemStatus,
      };
    });

    const addLink = (text: string) => {
      return <a>{text}</a>;
    };

    const addTag = (text: string) => {
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
            dataSource={data}
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
        <Select placeholder="Select the task" onChange={handleClick}>
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

export default Sidebar;
