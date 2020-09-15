import React, { useState } from 'react';
import { ITask } from '../../../interfaces/ITask';
import { ICheсk } from '../../../interfaces/IWorkDone';
import HeaderTask from './header-task';
import ControlsTask from './controls-task';
import CriteriaTask from './criteria-task';
import styles from './check-task.module.css';

type PropsCheckTask = {
  task: ITask;
  checkingTask: ICheсk;
};

function CheckTask({ task, checkingTask }: PropsCheckTask): JSX.Element {
  const [stateCheckingTask, setCheckingTask] = useState<ICheсk>(checkingTask);

  const onChangeScore = (cheсkingPointID: string, score: number) => {
    setCheckingTask((prev) => {
      const checking = prev.cheсking.map((item) => {
        if (item.cheсkingPointID === cheсkingPointID) {
          item.autorScore = score;
        }
      });
      return { ...prev, checking };
    });
  };

  const onChangeComment = (cheсkingPointID: string, score: number) => {
    setCheckingTask((prev) => {
      const checking = prev.cheсking.map((item) => {
        if (item.cheсkingPointID === cheсkingPointID) {
          item.autorScore = score;
        }
      });
      return { ...prev, checking };
    });
  };
  return (
    <>
      <HeaderTask title={task.name} description={task.description} />
      <CriteriaTask
        task={task}
        checkingTask={stateCheckingTask}
        onChangeComment={onChangeComment}
        onChangeScore={onChangeScore}
      />
      <ControlsTask />
    </>
  );
}

export default CheckTask;
