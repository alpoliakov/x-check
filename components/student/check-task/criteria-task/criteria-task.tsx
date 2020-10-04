import React from 'react';
import CriteriaGroupTask from './criteria-group-task';
import { ITask, TypeTask } from '../../../../interfaces/ITask';
import { Role } from '../../../../interfaces/IUser';
import { CheckState, ICheсk, IComment } from '../../../../interfaces/IWorkDone';
import styles from './criteria-task.module.css';

type PropsCheckTask = {
  task: ITask;
  checkingTask: ICheсk;
  role: Role;
  typeTask: TypeTask;
  stateCheck: CheckState;
  onChangeScore: (cheсkingPointID: string, score: number) => void;
  onChangeComment: (cheсkingPointID: string, comment: IComment) => void;
  onAgreePoint: (cheсkingPointID: string) => void;
  onDisagreePoint: (cheсkingPointID: string) => void;
};

export default function CriteriaTask({
  task,
  checkingTask,
  role,
  typeTask,
  stateCheck,
  onChangeScore,
  onChangeComment,
  onAgreePoint,
  onDisagreePoint,
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
        role={role}
        typeTask={typeTask}
        stateCheck={stateCheck}
        onChangeScore={onChangeScore}
        onChangeComment={onChangeComment}
        onAgreePoint={onAgreePoint}
        onDisagreePoint={onDisagreePoint}
        key={index}
      />
    );
  });
  return <div className={styles.criteria}>{criteriaGroupsTask}</div>;
}
