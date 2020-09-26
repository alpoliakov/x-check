import { ITask } from '../../../../interfaces/ITask';
import { Role } from '../../../../interfaces/IUser';
import { CheckState } from '../../../../interfaces/IWorkDone';

export default function filterTaskOnRole(task: ITask, role: Role, state: CheckState): ITask {
  switch (role) {
    case Role.mentor:
      return task;
    case Role.student: {
      if (state === CheckState.SelfTest) {
        return task;
      }
      const newTask = task.evaluationCriteria
        .filter((item) => {
          const res = item.criteriaPoints.filter((itemPoint) => {
            return itemPoint.isThisPointForAMentor === false;
          });
          return res.length !== 0;
        })
        .map((item) => {
          return {
            ...item,
            criteriaPoints: item.criteriaPoints.filter((itemPoint) => {
              return itemPoint.isThisPointForAMentor === false;
            }),
          };
        });
      return { ...task, evaluationCriteria: newTask };
    }
    default:
      return task;
  }
}
