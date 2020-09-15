export interface IWorkDone {
  id: string; //для обращения к данному шаблону проверки
  taskID: string; //для поиска таска, на основании которого сделана проверка
  state: TaskState;
  student: IStudent; //имя выполнившего работу
  publishedAt: Date; // дата создания проверки
  deadline: Date; //возможно пригодится для расчёта штрафов за просроченный дедлайн
  finalScore: number; //набранные, масимальный будет браться из таска
  mentor: IMentor; //возможно стоит оставить только поле auditorName если это будут отдельные объекты для каждого проверяющего
  checkers: IStudent[]; //но если все проверки в одном объекте булут лежать, будет сложнее навигация, но можно сделать напримр просмотр всех оценок проверяющим со спецролью
  cheсks: ICheсk[]; //собственно сами пункты проверки на основе которых считать весь скор
  sourceGithubRepoUrl: string;
  deployUrl: string;
}

export enum TaskState {
  isAutorDraft,
  isMentorDraft,
  isAuditorDraft,
  isAutorCheck,
  isMentorCheck,
}

export interface IMentor {
  id: string;
  name: string;
}

export interface IStudent {
  id: string;
  name: string;
  isAuditorAnonim?: boolean; //скрывать ли имя проверившего, очевидно для ментора неактуально
}

export interface ICheсk {
  checkerID: string;
  state: 'draft' | 'published';
  cheсking: ICheсkingPoint[];
  score: number; //набранные, масимальный будет браться из таска
  comment?: string; // для благодарностей
  isAnonim: boolean;
}
//результаты проверки по конкретным пунктам требований
export interface ICheсkingPoint {
  cheсkingPointID: string; //для обращения
  criteriaPointID: string; // два верхних пункта для связи с самим таском - поиск нужных пунктов
  autorScore: number; //оценка самопроверки
  auditorScore: number; //оценка проверяющего - студента или ментора
  refereeScore?: number; //финальная оценка в случае если вмешался человек со спецролью
  comments: IComment[]; //массив всех комментариев
  state: CheсkingPointState; // в зависимости от статуса будут доступны такие кнопки как оспорить/редактировать и тд
}

export enum CheсkingPointState {
  SelfCheck,
  NotVerified,
  Verified,
  Negotiations,
  Dispute,
  DisputeClosed,
}

//отдельные комментарии
export interface IComment {
  id: string; // для обращения редактирования/удаления
  text: string; //содержание комментария
  date: Date; //дата создания/правки комментария
  whoSaidThat: string; // autor, auditor, referee - дать возможность редактировать только тому, кто этот коммент написал
  isAnonimSay: boolean; // чтобы знать надо ли скрывать имя сказавшего
}
