import { CheckState, ICheсk, IWorkDone } from '../../../../interfaces/IWorkDone';

export default function createMentorCheck(checkingTask: IWorkDone): ICheсk {
  if (checkingTask.mentorCheck.state === undefined) {
    return {
      ...checkingTask.selfTest,
      checkerID: checkingTask.mentor.id,
      state: CheckState.AuditorDraft,
    };
  } else {
    return checkingTask.mentorCheck;
  }
}
