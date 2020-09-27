import { ITaskInfo, Role, StudentBasic } from '../../../interfaces/IUser';
import {
  IWorkDone,
  ICheсkingPoint,
  IComment,
  IStudent,
  IMentor,
  ICheсk,
  TaskState,
  CheсkingPointState,
  CheckState,
} from '../../../interfaces/IWorkDone';

const cheсkingComment1: IComment = {
  id: '1',
  text: 'Comment 1',
  date: new Date(),
  whoSaidThat: 'Student 1',
  isAnonimSay: true,
};

const cheсkingComment2: IComment = {
  id: '2',
  text: 'Comment 2',
  date: new Date(),
  whoSaidThat: 'Student 1',
  isAnonimSay: true,
};

const cheсkingPoint1: ICheсkingPoint = {
  cheсkingPointID: 'cheсkingPoint 1',
  criteriaPointID: 'criteriaPoint 1',
  autorScore: 0,
  auditorScore: 10,
  refereeScore: 10,
  comments: [cheсkingComment1],
  state: CheсkingPointState.Verified,
};

const cheсkingPoint2: ICheсkingPoint = {
  cheсkingPointID: 'cheсkingPoint 2',
  criteriaPointID: 'criteriaPoint 2',
  state: CheсkingPointState.Verified,
  autorScore: 5,
  auditorScore: 10,
  refereeScore: 15,
  comments: [cheсkingComment2],
};

const cheсkingPoint3: ICheсkingPoint = {
  cheсkingPointID: 'cheсkingPoint 3',
  criteriaPointID: 'criteriaPoint 3',
  state: CheсkingPointState.Verified,
  autorScore: 10,
  auditorScore: 10,
  refereeScore: 10,
  comments: [cheсkingComment1],
};

const cheсkingPoint4: ICheсkingPoint = {
  cheсkingPointID: 'cheсkingPoint 4',
  criteriaPointID: 'criteriaPoint 4',
  state: CheсkingPointState.Verified,
  autorScore: 15,
  auditorScore: 15,
  refereeScore: 15,
  comments: [cheсkingComment2],
};

const cheсkingPoint5: ICheсkingPoint = {
  cheсkingPointID: 'cheсkingPoint 5',
  criteriaPointID: 'criteriaPoint 5',
  state: CheсkingPointState.Verified,
  autorScore: 10,
  auditorScore: 5,
  refereeScore: 10,
  comments: [cheсkingComment1],
};

const cheсkingPoint6: ICheсkingPoint = {
  cheсkingPointID: 'cheсkingPoint 6',
  criteriaPointID: 'criteriaPoint 6',
  state: CheсkingPointState.Dispute,
  autorScore: 15,
  auditorScore: 15,
  refereeScore: 15,
  comments: [cheсkingComment2],
};

const mentor: IMentor = {
  id: 'Alex Alexsandrov',
  name: 'Mentor Mentor',
};

const student: IStudent = {
  id: 'Alex Alexsandrov 2183',
  name: 'Alex Alexsandrov',
  isAuditorAnonim: true,
};

const review1: IStudent = {
  id: 'reviewsID 1',
  name: 'reviews Пупкин',
  isAuditorAnonim: true,
};

const review2: IStudent = {
  id: 'reviewsID 2',
  name: 'reviews Пупкин',
  isAuditorAnonim: false,
};
const review3: IStudent = {
  id: 'reviewsID 3',
  name: 'reviews Пупкин',
  isAuditorAnonim: false,
};
const cheсksReviewer1: ICheсk = {
  checkerID: '',
  state: CheckState.AuditorDraft,
  cheсking: [
    cheсkingPoint1,
    cheсkingPoint2,
    cheсkingPoint3,
    cheсkingPoint4,
    cheсkingPoint5,
    cheсkingPoint6,
  ],
  score: 35,
  isAnonim: false,
  isNegotiation: false,
};

const mentorCheck: ICheсk = {
  checkerID: 'Alex Alexsandrov',
  state: CheckState.Verified,
  cheсking: [
    cheсkingPoint1,
    cheсkingPoint2,
    cheсkingPoint3,
    cheсkingPoint4,
    cheсkingPoint5,
    cheсkingPoint6,
  ],
  score: 70,
  isAnonim: false,
  isNegotiation: false,
};

const cheсksReviewer2: ICheсk = {
  checkerID: 'reviewsID 2',
  state: CheckState.Verified,
  cheсking: [cheсkingPoint4, cheсkingPoint5, cheсkingPoint6],
  score: 35,
  isAnonim: false,
  isNegotiation: false,
};
const cheсksReviewer3: ICheсk = {
  checkerID: 'reviewsID 3',
  state: CheckState.Dispute,
  cheсking: [cheсkingPoint4, cheсkingPoint5, cheсkingPoint6],
  score: 35,
  isAnonim: false,
  isNegotiation: false,
};

const cheсksReviewer4: ICheсk = {
  checkerID: 'reviewsID 4',
  state: CheckState.Verified,
  cheсking: [
    cheсkingPoint1,
    cheсkingPoint2,
    cheсkingPoint3,
    cheсkingPoint4,
    cheсkingPoint5,
    cheсkingPoint6,
  ],
  score: 70,
  isAnonim: false,
  isNegotiation: false,
};
const cheсksReviewer5: ICheсk = {
  checkerID: 'reviewsID 5',
  state: CheckState.Dispute,
  cheсking: [
    cheсkingPoint1,
    cheсkingPoint2,
    cheсkingPoint3,
    cheсkingPoint4,
    cheсkingPoint5,
    cheсkingPoint6,
  ],
  score: 70,
  isAnonim: false,
  isNegotiation: false,
};

const selftest: ICheсk = {
  checkerID: 'student',
  state: CheckState.SelfTest,
  cheсking: [
    cheсkingPoint1,
    cheсkingPoint2,
    cheсkingPoint3,
    cheсkingPoint4,
    cheсkingPoint5,
    cheсkingPoint6,
  ],
  score: 55,
  isAnonim: false,
  isNegotiation: false,
};

export const checkingTask: IWorkDone = {
  id: 'Songbird Anna 1',
  taskID: 'Songbird 1',
  state: TaskState.isCheking,
  student: student,
  publishedAt: new Date(),
  deadline: new Date(),
  finalScore: 20,
  selfTest: selftest,
  mentor: mentor,
  mentorCheck: mentorCheck,
  reviewers: [review1, review2, review3],
  cheсks: [cheсksReviewer1, cheсksReviewer2, cheсksReviewer3, cheсksReviewer4, cheсksReviewer5],
  sourceGithubRepoUrl: 'https://skaymant-songbird.netlify.app/',
  deployUrl: 'https://skaymant-songbird.netlify.app/',
};

const taskInfo1: ITaskInfo = {
  taskID: 'taskID',
  taskName: 'taskName',
};

export const user: StudentBasic = {
  id: 'sdasd11',
  name: 'Sam Shpakau',
  isActive: true,
  githubAddress: 'https://github.com/SkaymanT',
  role: Role.student,
  mentor: null,
  courseId: 'courseId',
  courseName: 'courseName',
  tasksID: [taskInfo1],
};
