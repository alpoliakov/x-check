export interface ICourse {
  id: string;
  name: string;
  tasks: ITaskStep[]; //таски, которые как будто уже в процессе выполнения
}

export interface ITaskStep {
  taskID: string;
  name: string;
  taskStage: string;
  deadline: number;
  start: number;
}
