import { ICriteriaGroup, ITask } from '../../../../interfaces/ITask';
import {
  CheckState,
  CheсkingPointState,
  ICheсk,
  ICheсkingPoint,
} from '../../../../interfaces/IWorkDone';

export default function createCheckOnTask(task: ITask, userID: string): ICheсk {
  const cheсking = task.evaluationCriteria.reduce((sum: ICheсkingPoint[], item: ICriteriaGroup) => {
    const res = item.criteriaPoints.map((itemPoint) => {
      return {
        cheсkingPointID: `${userID}_${itemPoint.criteriaPointID}`,
        criteriaPointID: itemPoint.criteriaPointID,
        autorScore: 0,
        auditorScore: 0,
        refereeScore: 0,
        comments: [],
        state: CheсkingPointState.NotVerified,
      };
    });
    return [...sum, ...res];
  }, [] as ICheсkingPoint[]);

  const selfTest = {
    checkerID: userID,
    state: CheckState.SelfTest,
    cheсking: cheсking,
    score: 0,
    isAnonim: false,
    isNegotiation: false,
  };

  return selfTest;
}
