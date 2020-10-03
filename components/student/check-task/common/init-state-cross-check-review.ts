import { ITask } from '../../../../interfaces/ITask';
import { UserBasic } from '../../../../interfaces/IUser';
import { IWorkDone } from '../../../../interfaces/IWorkDone';

type PropsCrossCheckReview = {
  user: UserBasic;
  tasks: ITask[];
  worksDone: IWorkDone[];
};

interface ICrossCheckReview {
  tasks: ITask[];
  activeTask: ITask;
  worksDone: IWorkDone[];
  activeWorkDone: IWorkDone;
  isNewWorkDone: boolean;
}

export default function initCrossCheckReview({
  user,
  tasks,
  worksDone,
}: PropsCrossCheckReview): ICrossCheckReview {
  console.log(user);
  console.log(tasks);
  console.log(worksDone);
  return {} as ICrossCheckReview;
}
