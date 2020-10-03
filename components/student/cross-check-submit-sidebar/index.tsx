import React from 'react';
import { Select, Input, Table, Tag } from 'antd';
import { ITask } from '../../../interfaces/ITask';
import styles from './index.module.css';
import { CheckState, IStudent, IWorkDone, IMentor, TaskState } from '../../../interfaces/IWorkDone';
import { ITaskStep } from '../../../interfaces/ICourse';

interface ISelectTask {
  name: string;
  id: string;
}
interface ILinks {
  deployUrl: string;
  sourceGithubRepoUrl: string;
}
interface ICourseData {
  taskStep: ITaskStep;
  task: ITask;
  workDone: IWorkDone;
}

interface PropsSidebar {
  taskList: ISelectTask[];
  activeCourseData: ICourseData;
  links: ILinks;
  getTask: (task: string) => void;
  getLinks: (links: ILinks) => void;
  selectReviewer: (reviewer: IStudent | IMentor) => void;
}

const SidebarSubmit: React.FC<PropsSidebar> = ({
  taskList,
  activeCourseData,
  links,
  getTask,
  getLinks,
  selectReviewer,
}) => {
  const { Option } = Select;

  const handleClick = (value: string) => {
    getTask(value);
  };

  const onChangeDeployUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    getLinks({ deployUrl: e.target.value, sourceGithubRepoUrl: links.sourceGithubRepoUrl });
  };
  const onChangeSourceGithubRepoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    getLinks({ deployUrl: links.deployUrl, sourceGithubRepoUrl: e.target.value });
  };

  const onClickRevewers = (reviewerID: string) => {
    const result = activeCourseData.workDone.reviewers.filter((item) => item.id === reviewerID);
    if (result.length !== 0) {
      selectReviewer(result[0]);
    } else {
      if (activeCourseData.workDone.mentor.id !== undefined) {
        selectReviewer(activeCourseData.workDone.mentor);
      } else {
        selectReviewer({} as IStudent);
      }
    }
  };

  let sideBarJSX: JSX.Element = <></>;
  let itemStatus = '';
  if (activeCourseData.task === undefined) {
    sideBarJSX = <></>;
  } else if (
    activeCourseData.task !== undefined &&
    activeCourseData.taskStep.taskStage === 'CROSS_CHECK' &&
    activeCourseData.workDone.id === undefined
  ) {
    sideBarJSX = <>The deadline has passed.</>;
  } else if (
    activeCourseData.task !== undefined &&
    activeCourseData.taskStep.taskStage === 'CROSS_CHECK' &&
    activeCourseData.workDone.id !== undefined
  ) {
    const data = activeCourseData.workDone.reviewers.map((item, index) => {
      let isAnonimSidebar: boolean;
      const stateItem = activeCourseData.workDone.cheсks.filter(
        (itemChecks) => itemChecks.checkerID === item.id
      );
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

    let statusMentor: string;
    if (activeCourseData.workDone.mentorCheck.state !== undefined) {
      switch (activeCourseData.workDone.mentorCheck.state) {
        case CheckState.AuditorDraft:
          statusMentor = 'Auditor Draft';
          break;
        case CheckState.NotVerified:
          statusMentor = 'Not Verified';
          break;
        case CheckState.Verified:
          statusMentor = 'Verified';
          break;
        case CheckState.Dispute:
          statusMentor = 'Dispute';
          break;
        case CheckState.DisputeClosed:
          statusMentor = 'Dispute closed';
          break;
        default:
          statusMentor = 'Auditor Draft';
      }
    } else {
      statusMentor = 'Auditor Draft';
    }

    const dataWithMentor =
      activeCourseData.workDone.mentor.id !== undefined
        ? [
            ...data,
            {
              key: activeCourseData.workDone.mentor.id,
              reviewer: `mentor-${activeCourseData.workDone.mentor.name}`,
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
  } else if (
    activeCourseData.task !== undefined &&
    activeCourseData.taskStep.taskStage === 'REQUESTS_GATHERING' &&
    (activeCourseData.workDone.id === undefined ||
      activeCourseData.workDone.state === TaskState.isSelfTest)
  ) {
    sideBarJSX = (
      <div>
        <h3>Solution URL Demo</h3>
        <Input
          placeholder="Link here"
          value={links.deployUrl}
          allowClear
          onChange={onChangeDeployUrl}
        />
        <h3>Solution URL Pull request</h3>
        <Input
          placeholder="Link here"
          value={links.sourceGithubRepoUrl}
          allowClear
          onChange={onChangeSourceGithubRepoUrl}
        />
      </div>
    );
  } else {
    sideBarJSX = <>You submitted. Cross-Check did not start!</>;
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
