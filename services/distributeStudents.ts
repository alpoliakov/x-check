import { IWorkDone } from '../interfaces/IWorkDone';
import { updateObjectField } from './updateFirebase';

export const distribute = (array: IWorkDone[], task: string): any => {
  const result = array.filter((e) => e.taskID === task);
  const objStudentsArray = result.map((e) => {
    return e.student;
  });
  if (result.length > 4) {
    for (let i = 0; i < result.length; i += 1)
      result.forEach((element, i: number) => {
        if (result.length - 1 === i) {
          updateObjectField('completed_tasks', element.id, {
            reviewers: [...element.reviewers, objStudentsArray.slice(0, 4)],
          });
          /*  return (element.reviewers = [...element.reviewers, objStudentsArray.slice(0, 4)]); */
        }
        if (result.length - 2 === i) {
          updateObjectField('completed_tasks', element.id, {
            reviewers: [
              ...element.reviewers,
              [...objStudentsArray.slice(-1), ...objStudentsArray.slice(0, 3)],
            ],
          });
          /*   return (element.reviewers = [
            ...element.reviewers,
            [...objStudentsArray.slice(-1), ...objStudentsArray.slice(0, 3)],
          ]); */
        }
        if (result.length - 3 === i) {
          updateObjectField('completed_tasks', element.id, {
            reviewers: [
              ...element.reviewers,
              [...objStudentsArray.slice(-2), ...objStudentsArray.slice(0, 2)],
            ],
          });
          /*  return (element.reviewers = [
            ...element.reviewers,
            [...objStudentsArray.slice(-2), ...objStudentsArray.slice(0, 2)],
          ]); */
        }
        if (result.length - 4 === i) {
          updateObjectField('completed_tasks', element.id, {
            reviewers: [
              ...element.reviewers,
              [...objStudentsArray.slice(-3), ...objStudentsArray.slice(0, 1)],
            ],
          });
          /*   return (element.reviewers = [
            ...element.reviewers,
            [...objStudentsArray.slice(-3), ...objStudentsArray.slice(0, 1)],
          ]); */
        } else {
          updateObjectField('completed_tasks', element.id, {
            reviewers: [...element.reviewers, objStudentsArray.slice(i + 1, i + 5)],
          });
          /* return (element.reviewers = [...element.reviewers, objStudentsArray.slice(i + 1, i + 5)]); */
        }
      });
  }
};
