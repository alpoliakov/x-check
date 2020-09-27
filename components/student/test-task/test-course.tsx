import { ICourse } from '../../../interfaces/ICourse';

export const dataCourse: ICourse = {
  id: 'course1',
  name: 'course1',
  tasks: [
    {
      taskID: 'Songbird 1',
      name: 'Songbird',
      taskStage: 'stage',
      deadline: new Date(2021, 0, 1).getTime(),
      start: new Date(0).getTime(),
    },
    {
      taskID: 'Songbird 1',
      name: 'Songbird 2',
      taskStage: 'stage',
      deadline: new Date(2021, 0, 1).getTime(),
      start: new Date().getTime(),
    },
    {
      taskID: 'Songbird 1',
      name: 'Songbird 3',
      taskStage: 'stage',
      deadline: new Date(0).getTime(),
      start: new Date().getTime(),
    },
  ],
};
