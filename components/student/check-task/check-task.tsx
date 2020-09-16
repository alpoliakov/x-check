import React, { useState } from 'react';
import { ITask } from '../../../interfaces/ITask';
import { ICheсk, IComment, IStudent } from '../../../interfaces/IWorkDone';
import HeaderTask from './header-task';
import ControlsTask from './controls-task';
import CriteriaTask from './criteria-task';
import styles from './check-task.module.css';

type PropsCheckTask = {
  task: ITask;
  checkingTask: ICheсk;
  reviewer: IStudent;
};

function CheckTask({ task, checkingTask, reviewer }: PropsCheckTask): JSX.Element {
  const [stateCheckingTask, setCheckingTask] = useState<ICheсk>(checkingTask);

  const onChangeScore = (cheсkingPointID: string, score: number) => {
    setCheckingTask((prev) => {
      prev.cheсking.forEach((item) => {
        if (item.cheсkingPointID === cheсkingPointID) {
          item.autorScore = score;
        }
      });
      return { ...prev };
    });
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
        score={stateCheckingTask.score}
        checkPoint={stateCheckingTask.cheсking.length}
      />
      <CriteriaTask
        task={task}
        checkingTask={stateCheckingTask}
        onChangeComment={onChangeComment}
        onChangeScore={onChangeScore}
      />
      <ControlsTask onSave={() => {}} onSubmit={() => {}} />
    </div>
  );
}

export default CheckTask;
