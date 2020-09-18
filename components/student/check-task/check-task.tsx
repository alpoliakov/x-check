import React, { useState } from 'react';
import { ITask, TypeTask } from '../../../interfaces/ITask';
import { Role } from '../../../interfaces/IUser';
import {
  ICheсk,
  IComment,
  IStudent,
  CheсkingPointState,
  CheckState,
} from '../../../interfaces/IWorkDone';
import HeaderTask from './header-task';
import ControlsTask from './controls-task';
import CriteriaTask from './criteria-task';
import createCheckOnTask from './common';
import styles from './check-task.module.css';

type PropsCheckTask = {
  task: ITask;
  checkingTask?: ICheсk;
  reviewer: IStudent;
  role: Role;
  typeTask: TypeTask;
  deployUrl: string;
  sourceGithubRepoUrl: string;
  onSave: (checkTask: ICheсk) => void;
  onSubmit: (checkTask: ICheсk) => void;
};

function CheckTask({
  task,
  checkingTask,
  reviewer,
  role,
  typeTask,
  deployUrl,
  sourceGithubRepoUrl,
  onSave,
  onSubmit,
}: PropsCheckTask): JSX.Element {
  switch (role) {
    case Role.student:
      console.log('Student');
      break;

    case Role.mentor:
      console.log('Mentor');
      typeTask = TypeTask.ReviewTask;
      break;
  }
  const [stateCheckingTask, setCheckingTask] = useState<ICheсk>(
    checkingTask || createCheckOnTask(task)
  );
  console.log(stateCheckingTask);

  const onChangeScore = (cheсkingPointID: string, score: number) => {
    setCheckingTask((prev) => {
      prev.cheсking.forEach((item) => {
        if (item.cheсkingPointID === cheсkingPointID) {
          item.autorScore = score;
        }
      });
      prev.score = doScore(prev);
      return { ...prev };
    });
  };

  const onChangeIsAnonim = () => {
    setCheckingTask((prev) => {
      prev.isAnonim = !prev.isAnonim;
      return { ...prev };
    });
  };

  const doMaxScore = (task: ITask) => {
    return task.evaluationCriteria.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.criteriaPoints.reduce((ac, cur) => {
          return ac + cur.criteriaPointScore;
        }, 0)
      );
    }, 0);
  };

  const doScore = (cheсkTask: ICheсk) => {
    return cheсkTask.cheсking.reduce((accumulator, currentValue) => {
      switch (currentValue.state) {
        case CheсkingPointState.SelfCheck:
          return accumulator + currentValue.autorScore;
        default:
          return accumulator + currentValue.autorScore;
      }
    }, 0);
  };

  const onSaveCheckTask = () => {
    onSave(stateCheckingTask);
  };

  const onSubmitCheckTask = () => {
    setCheckingTask((prev) => {
      prev.state = CheckState.isAuditorCheck;
      return { ...prev };
    });
    onSubmit(stateCheckingTask);
  };

  const onChangeComment = (cheсkingPointID: string, comment: IComment) => {
    reviewer.isAuditorAnonim === true
      ? (comment.whoSaidThat = `Reviewer`)
      : (comment.whoSaidThat = reviewer.name);
    setCheckingTask((prev) => {
      const newChecking = prev.cheсking.map((item) => {
        if (item.cheсkingPointID === cheсkingPointID) {
          item.comments.push(comment);
        }
        return item;
      });
      return { ...prev, cheсking: newChecking };
    });
  };

  return (
    <div>
      <HeaderTask
        title={task.name}
        description={task.description}
        sourceGithubRepoUrl={sourceGithubRepoUrl}
        deployUrl={deployUrl}
        score={stateCheckingTask.score}
        maxScore={doMaxScore(task)}
      />
      <CriteriaTask
        task={task}
        checkingTask={stateCheckingTask}
        onChangeComment={onChangeComment}
        onChangeScore={onChangeScore}
      />
      <ControlsTask
        isAnonim={stateCheckingTask.isAnonim}
        onChangeIsAnonim={onChangeIsAnonim}
        onSave={onSaveCheckTask}
        onSubmit={onSubmitCheckTask}
      />
    </div>
  );
}

export default CheckTask;
