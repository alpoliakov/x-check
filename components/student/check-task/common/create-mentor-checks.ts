import { ICheсk, IWorkDone } from '../../../../interfaces/IWorkDone';

export default function createMentorCheck(checkingTask: IWorkDone): ICheсk {
  if (checkingTask.mentorCheck.state === undefined) {
    return { ...checkingTask.selfTest, checkerID: checkingTask.mentor.id };
  } else {
    return checkingTask.mentorCheck;
  }
}
