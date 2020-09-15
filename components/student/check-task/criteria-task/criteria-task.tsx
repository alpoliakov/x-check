import React from 'react';
import CriteriaGroupTask from './criteria-group-task';
import { ITask } from '../../../../interfaces/ITask';
import { ICheсk, IComment } from '../../../../interfaces/IWorkDone';

type PropsCheckTask = {
  task: ITask;
  checkingTask: ICheсk;
  onChangeScore: (cheсkingPointID: string, score: number) => void;
  onChangeComment: (cheсkingPointID: string, comment: IComment) => void;
};

function CriteriaTask({
  task,
  checkingTask,
  onChangeScore,
  onChangeComment,
}: PropsCheckTask): JSX.Element {
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
        onChangeComment={onChangeComment}
        key={index}
      />
    );
  });
  return <>{criteriaGroupsTask}</>;
}

export default CriteriaTask;
