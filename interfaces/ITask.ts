// лучше написать автоподсчёт maxScor при заливке
export interface ITask {
  id: string;
  name: string;
  author?: string;
  publisher: string; //id user
  state: 'draft' | 'published';
  publishedAt?: Date;
  demo?: string;
  description: string;
  evaluationCriteria: ICriteria[];
  usefulLinks?: string[];
  oldUrl?: string; // откуда импортировали таск
  useJury: boolean; //будет ли оценка жюри
  checkingType: 'crossCheck';
}
//groupScore автоподсчётом
export interface ICriteria {
  groupID: string;
  groupName: string;
  criteriaItem: ICriteriaItem[];
}

export interface ICriteriaItem {
  itemID: string;
  itemName: string;
  itemScore: number;
  isFine: boolean;
  isThisPointForAMentor: boolean;
}
