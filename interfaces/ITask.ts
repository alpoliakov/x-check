// лучше написать автоподсчёт maxScor при заливке
export interface ITask {
  id: string;
  name: string;
  authorName?: string;
  publisherID: string; //id user
  state: StateTask;
  publishedAt?: number;
  demo?: string;
  description: string;
  evaluationCriteria: ICriteriaGroup[];
  usefulLinks?: string[];
  oldUrl?: string; // откуда импортировали таск
  useJury: boolean; //будет ли оценка жюри
  checkingType: 'crossCheck';
}

export enum StateTask {
  draft,
  active,
  published,
}
//groupScore автоподсчётом
export interface ICriteriaGroup {
  groupID: string;
  groupName: string;
  criteriaPoints: ICriteriaPoint[];
}

export interface ICriteriaPoint {
  criteriaPointID: string;
  criteriaPointName: string;
  criteriaPointScore: number;
  isFine: boolean;
  isThisPointForAMentor: boolean;
}

export enum TypeTask {
  SubmitTask,
  ReviewTask,
}
