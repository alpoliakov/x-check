import { ITask } from '../../../../interfaces/ITask';
import { ICheсk } from '../../../../interfaces/IWorkDone';

export default function createCheckOnTask(task: ITask): ICheсk {
  console.log('task', task);
  return {} as ICheсk;
}
