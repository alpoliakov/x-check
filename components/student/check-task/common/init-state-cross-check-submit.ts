import { ICourse, ITaskStep } from '../../../../interfaces/ICourse';
import { ITask } from '../../../../interfaces/ITask';
import { UserBasic } from '../../../../interfaces/IUser';
import { IWorkDone } from '../../../../interfaces/IWorkDone';

interface ICrossCheckSubmit {
  courseData: ICourseData[];
  activeCourseData: ICourseData;
  isNewWorkDone: boolean;
}
interface ICourseData {
  taskStep: ITaskStep;
  task: ITask;
  workDone: IWorkDone;
}

export default function initCrossCheckSubmit(
  user: UserBasic,
  tasks: ITask[],
  worksDone: IWorkDone[],
  course: ICourse[]
): ICrossCheckSubmit {
  const courseData: ICourseData[] =
    course[0] !== undefined && course.length !== 0
      ? course[0].tasks.map((courseTask) => {
          const courseTasks = tasks.filter((task) => task.id === courseTask.taskID);
          const courseWorksDone = worksDone.filter(
            (workDone) => workDone.taskID === courseTask.taskID && workDone.student.id === user.uid
          );
          if (courseTasks.length !== 0 && courseWorksDone.length !== 0) {
            const result: ICourseData = {
              taskStep: courseTask,
              task: courseTasks[0],
              workDone: courseWorksDone[0],
            };
            return result;
          } else if (courseTasks.length !== 0 && courseWorksDone.length === 0) {
            const result: ICourseData = {
              taskStep: courseTask,
              task: courseTasks[0],
              workDone: {} as IWorkDone,
            };
            return result;
          } else if (courseTasks.length === 0 && courseWorksDone.length !== 0) {
            const result: ICourseData = {
              taskStep: courseTask,
              task: {} as ITask,
              workDone: courseWorksDone[0],
            };
            return result;
          } else {
            const result: ICourseData = {
              taskStep: courseTask,
              task: {} as ITask,
              workDone: {} as IWorkDone,
            };
            return result;
          }
        })
      : [];
  const checkResult: ICrossCheckSubmit = {
    courseData: courseData,
    activeCourseData: {} as ICourseData,
    isNewWorkDone: false,
  };
  return checkResult;
}
