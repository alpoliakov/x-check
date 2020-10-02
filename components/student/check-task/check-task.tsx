import React, { useState } from 'react';
import { ITask, TypeTask } from '../../../interfaces/ITask';
import { Role } from '../../../interfaces/IUser';
import {
  ICheсk,
  ICheсkingPoint,
  IComment,
  IStudent,
  CheckState,
  IMentor,
  CheсkingPointState,
} from '../../../interfaces/IWorkDone';
import HeaderTask from './header-task';
import ControlsTask from './controls-task';
import CriteriaTask from './criteria-task';
import styles from './check-task.module.css';
import { filterTaskOnRole } from './common';

type PropsCheckTask = {
  task: ITask; // из него берется описание критериев
  checkingTask: ICheсk; // из него берется оценки
  reviewer: IStudent | IMentor; // нужен для комментов автора комментов
  role: Role; // нужен для определения особых пунктов специально для менторов
  changeOutside: boolean; //чтобы определять изменился ли стате извне
  typeTask: TypeTask; // определить reviewer проверяющий или проверяемый
  deployUrl: string; // для ссылки в хедере
  sourceGithubRepoUrl: string; // для ссылки в хедере
  onSave: (checkTask: ICheсk) => void; // при отправки на сервер без изменения статуса проверки
  onSubmit: (checkTask: ICheсk) => void; // при отправки на сервер с изменением статуса
};

function CheckTask({
  task,
  checkingTask,
  reviewer,
  role,
  typeTask,
  changeOutside,
  deployUrl,
  sourceGithubRepoUrl,
  onSave,
  onSubmit,
}: PropsCheckTask): JSX.Element {
  if (typeTask === TypeTask.SubmitTask && checkingTask.state === CheckState.AuditorDraft) {
    return (
      <div className={styles.test}>
        <p>In the process of checking</p>
      </div>
    );
  } else if (typeTask === TypeTask.ReviewTask && checkingTask.state === CheckState.NotVerified) {
    return (
      <div className={styles.test}>
        <p>In the process of approval</p>
      </div>
    );
  }
  task = filterTaskOnRole(task, role, checkingTask.state);
  const [stateChangeOutside, setStateChangeOutside] = React.useState<boolean>(changeOutside);
  const [stateCheckingTask, setCheckingTask] = useState<ICheсk>(checkingTask);
  if (checkingTask !== stateCheckingTask && stateChangeOutside !== changeOutside) {
    console.log('изменения извне');
    setCheckingTask(checkingTask);
    setStateChangeOutside((prev) => !prev);
  }

  console.log('stateCheckingTask', stateCheckingTask);
  const onAgreeAllPoint = () => {
    setCheckingTask((prev) => {
      const newCheckingPointState = prev.cheсking.map((item) => {
        if (item.state === CheсkingPointState.NotVerified) {
          item.state = CheсkingPointState.Verified;
        }
        return item;
      });
      return { ...prev, cheсking: newCheckingPointState };
    });
  };

  const onAgreePoint = (cheсkingPointID: string) => {
    setCheckingTask((prev) => {
      const newCheckingPointState = prev.cheсking.map((item) => {
        if (item.cheсkingPointID === cheсkingPointID) {
          item.state = CheсkingPointState.Verified;
        }
        return item;
      });
      return { ...prev, cheсking: newCheckingPointState };
    });
  };

  const onDisagreePoint = (cheсkingPointID: string) => {
    setCheckingTask((prev) => {
      const newCheckingPointState = prev.cheсking.map((item) => {
        if (item.cheсkingPointID === cheсkingPointID) {
          item.state = CheсkingPointState.Dispute;
        }
        return item;
      });
      return { ...prev, cheсking: newCheckingPointState };
    });
  };

  const onChangeScore = (cheсkingPointID: string, score: number) => {
    setCheckingTask((prev) => {
      const newScore = prev.cheсking.map((item) => {
        if (item.cheсkingPointID === cheсkingPointID) {
          if (prev.state === CheckState.SelfTest) {
            item.autorScore = score;
          } else {
            item.auditorScore = score;
          }
        }
        return item;
      });
      return { ...prev, cheсking: newScore, score: doScore(newScore, stateCheckingTask.state) };
    });
  };

  const onChangeComment = (cheсkingPointID: string, comment: IComment) => {
    if ((reviewer as IStudent).isAuditorAnonim !== undefined) {
      if (
        !(reviewer as IStudent).isAuditorAnonim &&
        role === Role.student &&
        typeTask === TypeTask.ReviewTask
      ) {
        comment.whoSaidThat = `Reviewer`;
      } else if (
        !(reviewer as IStudent).isAuditorAnonim &&
        role === Role.student &&
        typeTask === TypeTask.SubmitTask
      ) {
        comment.whoSaidThat = `Student`;
      } else {
        comment.whoSaidThat = reviewer.name;
      }
    } else if ((reviewer as IStudent).isAuditorAnonim === undefined) {
      if (role === Role.student && typeTask === TypeTask.ReviewTask) {
        comment.whoSaidThat = `Reviewer`;
      } else if (role === Role.student && typeTask === TypeTask.SubmitTask) {
        comment.whoSaidThat = `Student`;
      }
    } else if (role === Role.mentor) {
      comment.whoSaidThat = reviewer.name;
    }

    setCheckingTask((prev) => {
      const newChecking = prev.cheсking.map((item) => {
        if (item.cheсkingPointID === cheсkingPointID) {
          item.comments.push(comment);
        }
        return item;
      });
      return { ...prev, cheсking: newChecking };
    });
  };

  const onChangeIsAnonim = () => {
    setCheckingTask((prev) => {
      return { ...prev, isAnonim: !prev.isAnonim };
    });
  };

  const doMaxScore = (task: ITask) => {
    return task.evaluationCriteria.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.criteriaPoints.reduce((ac, cur) => {
          return ac + cur.criteriaPointScore;
        }, 0)
      );
    }, 0);
  };

  const doScore = (cheсking: ICheсkingPoint[], stateTask: CheckState) => {
    return cheсking.reduce((accumulator, currentValue) => {
      switch (stateTask) {
        case CheckState.SelfTest:
          return accumulator + currentValue.autorScore;
        case CheckState.AuditorDraft:
          return accumulator + currentValue.auditorScore;
        default:
          return accumulator + currentValue.auditorScore;
      }
    }, 0);
  };

  const onSaveCheckTask = () => {
    setCheckingTask((prev) => {
      if (prev.state === CheckState.SelfTest) {
        return { ...prev, state: CheckState.SelfTest };
      } else if (prev.state === CheckState.AuditorDraft) {
        return { ...prev, state: CheckState.NotVerified };
      } else {
        return { ...prev, state: CheckState.NotVerified };
      }
    });
    onSave(stateCheckingTask);
  };

  const changeStatePoint = (checkTask: ICheсk, newCheсkingPointState: CheсkingPointState) => {
    if (newCheсkingPointState === CheсkingPointState.Verified) {
      return checkTask.cheсking.map((item) => {
        if (item.autorScore === item.autorScore) {
          item.state = newCheсkingPointState;
        }
        return item;
      });
    } else {
      return checkTask.cheсking.map((item) => {
        item.state = newCheсkingPointState;
        return item;
      });
    }
  };

  const changeStateCheck = (checkTask: ICheсk) => {
    const bufStatePoints = checkTask.cheсking.reduce(
      (sum: CheсkingPointState, cheсkingPoint: ICheсkingPoint) => {
        if (cheсkingPoint.state === CheсkingPointState.NotVerified) {
          sum = cheсkingPoint.state;
        } else if (
          cheсkingPoint.state !== CheсkingPointState.Verified &&
          sum !== CheсkingPointState.NotVerified
        ) {
          sum = cheсkingPoint.state;
        }
        return sum;
      },
      checkTask.cheсking[0].state
    );
    switch (bufStatePoints) {
      case CheсkingPointState.NotVerified: {
        return CheckState.NotVerified;
      }
      case CheсkingPointState.Verified: {
        return CheckState.Verified;
      }
      case CheсkingPointState.Dispute: {
        return CheckState.Dispute;
      }
      case CheсkingPointState.DisputeClosed: {
        return CheckState.DisputeClosed;
      }
      default: {
        return CheckState.NotVerified;
      }
    }
  };

  const onSubmitCheckTask = () => {
    setCheckingTask((prev) => {
      switch (prev.state) {
        case CheckState.SelfTest: {
          const current = {
            ...prev,
            state: CheckState.AuditorDraft,
            cheсking: changeStatePoint(prev, CheсkingPointState.NotVerified),
          };
          onSubmit(current);
          return current;
        }
        case CheckState.AuditorDraft: {
          const current = {
            ...prev,
            state: CheckState.NotVerified,
            cheсking: changeStatePoint(prev, CheсkingPointState.NotVerified),
          };
          onSubmit(current);
          return current;
        }
        case CheckState.NotVerified: {
          const current = {
            ...prev,
            state: changeStateCheck(prev),
          };
          onSubmit(current);
          return current;
        }
        case CheckState.Dispute: {
          const current = {
            ...prev,
            state: changeStateCheck(prev),
          };
          onSubmit(current);
          return current;
        }
        default: {
          const current = {
            ...prev,
            state: changeStateCheck(prev),
          };
          onSubmit(current);
          return current;
        }
      }
    });
  };
  return (
    <div className={styles.test}>
      <HeaderTask
        title={task.name}
        description={'Description'}
        sourceGithubRepoUrl={sourceGithubRepoUrl}
        deployUrl={deployUrl}
        score={stateCheckingTask.score}
        maxScore={doMaxScore(task)}
      />
      <CriteriaTask
        task={task}
        checkingTask={stateCheckingTask}
        role={role}
        typeTask={typeTask}
        stateCheck={stateCheckingTask.state}
        onChangeComment={onChangeComment}
        onChangeScore={onChangeScore}
        onAgreePoint={onAgreePoint}
        onDisagreePoint={onDisagreePoint}
      />
      <ControlsTask
        role={role}
        isAnonim={stateCheckingTask.isAnonim}
        onChangeIsAnonim={onChangeIsAnonim}
        typeTask={typeTask}
        stateCheck={stateCheckingTask.state}
        onSave={onSaveCheckTask}
        onSubmit={onSubmitCheckTask}
        onAgree={onAgreeAllPoint}
      />
    </div>
  );
}

export default CheckTask;
