import { ICheсk, IStudent, IWorkDone } from '../../../../interfaces/IWorkDone';

export default function createCheckOnReviwer(checkingTask: IWorkDone, reviewer: IStudent): ICheсk {
  const res = checkingTask.cheсks.filter((item) => {
    return item.checkerID === reviewer.id;
  });
  console.log(res);
  if (res.length !== 0) {
    return res[0];
  } else {
    return { ...checkingTask.selfTest, checkerID: reviewer.id };
  }
}
