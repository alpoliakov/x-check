import React from 'react';
import CriteriaGroupTask from './criteria-group-task';
import { ITask } from '../../../../interfaces/ITask';
import { ICheсk } from '../../../../interfaces/IWorkDone';

type PropsCheckTask = {
  task: ITask;
  checkingTask: ICheсk;
  onChangeScore: (cheсkingPointID: string, score: number) => void;
};

function CriteriaTask({ task, checkingTask, onChangeScore }: PropsCheckTask): JSX.Element {
  const criteriaGroupsTask = task.evaluationCriteria.map((item, index) => {
    const cheсkingPoints = item.criteriaPoints.map((point) => {
      const [res] = checkingTask.cheсking.filter((item) => {
        if (item.criteriaPointID === point.criteriaPointID) return true;
        else return false;
      });
      return res;
    });
    return (
      <CriteriaGroupTask
        criteriaGroup={item}
        cheсkingPoints={cheсkingPoints}
        onChangeScore={onChangeScore}
        key={index}
      />
    );
  });
  return <>{criteriaGroupsTask}</>;
}

export default CriteriaTask;
