import React from 'react';
import CheckTask from '../../student/check-task';
import { ITask, TypeTask } from '../../../interfaces/ITask';
import { ICheсk, IWorkDone } from '../../../interfaces/IWorkDone';
import { Role } from '../../../interfaces/IUser';

interface PropsMentorCheck {
  task: ITask;
  workDone: IWorkDone;
  changeOutside: boolean;
  onSave: (checkTask: ICheсk) => void;
  onSubmit: (checkTask: ICheсk) => void;
}

const MentorCheck: React.FC<PropsMentorCheck> = ({
  task,
  workDone,
  changeOutside,
  onSave,
  onSubmit,
}) => {
  return (
    <CheckTask
      task={task}
      checkingTask={workDone.mentorCheck}
      reviewer={workDone.mentor}
      changeOutside={changeOutside}
      deployUrl={workDone.deployUrl}
      sourceGithubRepoUrl={workDone.sourceGithubRepoUrl}
      role={Role.mentor}
      typeTask={TypeTask.ReviewTask}
      onSave={onSave}
      onSubmit={onSubmit}
    />
  );
};

export default MentorCheck;
