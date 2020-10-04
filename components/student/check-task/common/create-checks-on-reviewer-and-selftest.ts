import { ITask } from '../../../../interfaces/ITask';
import { Role } from '../../../../interfaces/IUser';
import { CheckState, ICheсk, IStudent, IWorkDone } from '../../../../interfaces/IWorkDone';
import copyGradesFromCheck from './copy-grades-from-check';
import createCheckOnTask from './create-check-on-task';
import filterTaskOnRole from './filter-task-on-role';

export default function createCheckOnReviewer(
  task: ITask,
  checkingTask: IWorkDone,
  reviewer: IStudent
): ICheсk {
  const res = checkingTask.cheсks.filter((item) => {
    return item.checkerID === reviewer.id;
  });
  if (res.length !== 0) {
    return res[0];
  } else {
    const reviewerTask = filterTaskOnRole(task, Role.student, CheckState.AuditorDraft);
    const reviewerCheck = createCheckOnTask(reviewerTask, reviewer.id);
    const updateReviewerCheck = copyGradesFromCheck(reviewerCheck, checkingTask.selfTest);
    return updateReviewerCheck;
  }
}
