import { ICourse } from '../../../interfaces/ICourse';

export const dataCourse: ICourse[] = [
  {
    id: 'course1',
    name: 'course1',
    tasks: [
      {
        taskID: 'Songbird 1',
        name: 'Songbird',
        taskStage: 'stage',
        deadline: new Date(2021, 0, 1).getTime(),
        start: new Date(2020, 0, 1).getTime(),
      },
      {
        taskID: 'raindrops',
        name: 'raindrops',
        taskStage: 'stage',
        deadline: new Date(2020, 0, 2).getTime(),
        start: new Date(2020, 0, 1).getTime(),
      },
      {
        taskID: 'schedule',
        name: 'schedule',
        taskStage: 'stage',
        deadline: new Date(2021, 0, 2).getTime(),
        start: new Date(2020, 0, 1).getTime(),
      },
      {
        taskID: 'X Check App / RS Assessment Tool',
        name: 'X Check App / RS Assessment Tool',
        taskStage: 'stage',
        deadline: new Date(2021, 0, 2).getTime(),
        start: new Date(2020, 0, 1).getTime(),
      },
    ],
  },
];
