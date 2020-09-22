import { ITask } from '../../../../interfaces/ITask';
import { StudentBasic } from '../../../../interfaces/IUser';
import { ICheсk, IStudent, IMentor, IWorkDone, TaskState } from '../../../../interfaces/IWorkDone';

export default function createTask(task: ITask, user: StudentBasic): IWorkDone {
  const student: IStudent = {
    id: user.id,
    name: user.name,
  };

  const mentor = {} as IMentor;
  const selfTest = {} as ICheсk;

  return {
    id: `${task.id}_${user.id}`,
    taskID: task.id,
    state: TaskState.isCheking,
    student: student,
    publishedAt: new Date(),
    deadline: new Date(),
    finalScore: 0,
    selfTest: selfTest,
    mentor: mentor,
    reviewers: [],
    cheсks: [],
    sourceGithubRepoUrl: '',
    deployUrl: '',
  } as IWorkDone;
}
