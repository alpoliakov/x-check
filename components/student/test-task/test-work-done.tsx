import {
  IWorkDone,
  ICheсkingPoint,
  IComment,
  IStudent,
  IMentor,
  ICheсk,
  TaskState,
  CheckStateMentor,
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
  auditorScore: 5,
  refereeScore: 10,
  comments: [cheсkingComment1],
  state: CheсkingPointState.SelfCheck,
};

const cheсkingPoint2: ICheсkingPoint = {
  cheсkingPointID: 'cheсkingPoint 2',
  criteriaPointID: 'criteriaPoint 2',
  state: CheсkingPointState.SelfCheck,
  autorScore: 5,
  auditorScore: 10,
  refereeScore: 15,
  comments: [cheсkingComment2],
};

const cheсkingPoint3: ICheсkingPoint = {
  cheсkingPointID: 'cheсkingPoint 3',
  criteriaPointID: 'criteriaPoint 3',
  state: CheсkingPointState.SelfCheck,
  autorScore: 10,
  auditorScore: 10,
  refereeScore: 10,
  comments: [cheсkingComment1],
};

const cheсkingPoint4: ICheсkingPoint = {
  cheсkingPointID: 'cheсkingPoint 4',
  criteriaPointID: 'criteriaPoint 4',
  state: CheсkingPointState.Negotiations,
  autorScore: 15,
  auditorScore: 15,
  refereeScore: 15,
  comments: [cheсkingComment2],
};

const mentor: IMentor = {
  id: 'Alex Alexsandrov 2183',
  name: 'Alex Alexsandrov',
  state: CheckStateMentor.isMentorDraft,
  cheсking: [cheсkingPoint1, cheсkingPoint2, cheсkingPoint3, cheсkingPoint4],
  score: 30,
};

const student: IStudent = {
  id: 'Alex Alexsandrov 2183',
  name: 'Alex Alexsandrov',
  isAuditorAnonim: true,
};

const review1: IStudent = {
  id: 'reviewsID 1',
  name: 'reviews 1',
  isAuditorAnonim: true,
};

const reviews2: IStudent = {
  id: 'reviewsID 2',
  name: 'reviews 2',
  isAuditorAnonim: false,
};

const cheсksReviewer1: ICheсk = {
  checkerID: 'reviewsID 1',
  state: CheckState.isAuditorDraft,
  cheсking: [cheсkingPoint1, cheсkingPoint2, cheсkingPoint3, cheсkingPoint4],
  score: 30,
  isAnonim: false,
};

const cheсksReviewer2: ICheсk = {
  checkerID: 'reviewsID 2',
  state: CheckState.isAuditorDraft,
  cheсking: [cheсkingPoint1, cheсkingPoint2, cheсkingPoint3, cheсkingPoint4],
  score: 30,
  isAnonim: false,
};

export const checkingTask: IWorkDone = {
  id: 'Songbird Anna 1',
  taskID: 'Songbird 1',
  state: TaskState.isAutorDraft,
  student: student,
  publishedAt: new Date(),
  deadline: new Date(),
  finalScore: 20,
  mentor: mentor,
  checkers: [review1, reviews2],
  cheсks: [cheсksReviewer1, cheсksReviewer2],
  sourceGithubRepoUrl: 'https://skaymant-songbird.netlify.app/',
  deployUrl: 'https://skaymant-songbird.netlify.app/',
};
