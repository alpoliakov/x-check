export interface ICourse {
  id: number;
  name: string;
  tasks: ITaskStep[]; //таски, которые как будто уже в процессе выполнения
}

export interface ITaskStep {
  taskID: number;
  name: string;
  taskStage: string;
  deadline: Date;
  start: Date;
}
