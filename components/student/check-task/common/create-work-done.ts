import { ITask } from '../../../../interfaces/ITask';
import { UserBasic } from '../../../../interfaces/IUser';
import { IStudent, IMentor, IWorkDone, TaskState } from '../../../../interfaces/IWorkDone';
import createCheckOnTask from './create-check-on-task';

export default function createWorkDone(task: ITask, activeUser: UserBasic, users: UserBasic[]): IWorkDone {
  const student: IStudent = {
    id: activeUser.uid,
    name: activeUser.nickname,
    isAuditorAnonim: false,
  };

  const selfTest = createCheckOnTask(task, activeUser.uid);
  let mentor: IMentor;
  if (activeUser.mentor !== undefined && activeUser.mentor !== null) {
    mentor = { id: activeUser.mentor.id, name: activeUser.mentor.id } as IMentor;
  } else {
    mentor = {} as IMentor;
  }

  return {
    id: `${task.id}_${activeUser.uid}`,
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
