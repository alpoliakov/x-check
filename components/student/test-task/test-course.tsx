import { ICourse } from '../../../interfaces/ICourse';

export const dataCourse: ICourse = {
  id: 123,
  name: 'course1',
  tasks: [
    {
      taskID: 123,
      name: 'task1',
      taskStage: 'stage',
      deadline: new Date(0),
      start: new Date(),
    },
    {
      taskID: 567,
      name: 'task2',
      taskStage: 'stage',
      deadline: new Date(2021, 0, 1),
      start: new Date(),
    },
    {
      taskID: 438,
      name: 'task3',
      taskStage: 'stage',
      deadline: new Date(0),
      start: new Date(),
    },
  ],
};
