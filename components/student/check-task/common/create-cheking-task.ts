import { ITask } from '../../../../interfaces/ITask';
import { UserBasic } from '../../../../interfaces/IUser';
import { IStudent, IMentor, IWorkDone, TaskState } from '../../../../interfaces/IWorkDone';
import createCheckOnTask from './create-check-on-task';

export default function createTask(task: ITask, user: UserBasic): IWorkDone {
  const student: IStudent = {
    id: user.uid,
    name: user.nickname,
  };

  const selfTest = createCheckOnTask(task, `${user.uid}`);
  const mentor = {} as IMentor;
  return {
    id: `${task.id}_${user.uid}`,
    taskID: task.id,
    state: TaskState.isSelfTest,
    student: student,
    publishedAt: new Date().getTime(),
    deadline: new Date().getTime(),
    finalScore: 0,
    selfTest: selfTest,
    mentor: mentor,
    mentorCheck: selfTest,
    reviewers: [],
    cheсks: [],
    sourceGithubRepoUrl: '',
    deployUrl: '',
  } as IWorkDone;
}
