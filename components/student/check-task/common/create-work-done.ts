import { ITask } from '../../../../interfaces/ITask';
import { UserBasic } from '../../../../interfaces/IUser';
import {
  IStudent,
  IMentor,
  IWorkDone,
  TaskState,
  CheckState,
  ICheсk,
} from '../../../../interfaces/IWorkDone';
import createCheckOnTask from './create-check-on-task';

export default function createWorkDone(
  task: ITask,
  activeUser: UserBasic,
  users: UserBasic[]
): IWorkDone {
  const student: IStudent = {
    id: activeUser.uid,
    name: activeUser.nickname,
    isAuditorAnonim: false,
  };

  const selfTest = createCheckOnTask(task, activeUser.uid);
  let mentor: IMentor;
  if (activeUser.mentor !== undefined && activeUser.mentor !== null) {
    const bufID = activeUser.mentor.id;
    const mentors = users.filter((searchUser) => searchUser.uid === bufID);
    if (mentors.length !== 0) {
      mentor = { id: activeUser.mentor.id, name: mentors[0].nickname } as IMentor;
    } else {
      mentor = {} as IMentor;
    }
  } else {
    mentor = {} as IMentor;
  }

  const mentorCheck: ICheсk = { ...selfTest, state: CheckState.AuditorDraft };

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
    mentorCheck: mentorCheck,
    reviewers: [],
    cheсks: [],
    sourceGithubRepoUrl: '',
    deployUrl: '',
  } as IWorkDone;
}
