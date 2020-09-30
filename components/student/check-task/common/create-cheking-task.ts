import { ITask } from '../../../../interfaces/ITask';
import { IStudent, IMentor, IWorkDone, TaskState } from '../../../../interfaces/IWorkDone';
import createCheckOnTask from './create-check-on-task';

export default function createWorkDone(task: ITask, userID: string, userName: string): IWorkDone {
  const student: IStudent = {
    id: userID,
    name: userName,
  };

  const selfTest = createCheckOnTask(task, userID);
  const mentor = {} as IMentor;
  return {
    id: `${task.id}_${userID}`,
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
