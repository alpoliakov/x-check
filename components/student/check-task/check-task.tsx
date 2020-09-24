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
import { createCheckOnTask } from './common';
import styles from './check-task.module.css';

type PropsCheckTask = {
  task: ITask; // из него берется описание критериев
  checkingTask: ICheсk; // из него берется оценки
  reviewer: IStudent | IMentor; // нужен для комментов автора комментов
  role: Role; // нужен для определения особых пунктов специально для менторов
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
  deployUrl,
  sourceGithubRepoUrl,
  onSave,
  onSubmit,
}: PropsCheckTask): JSX.Element {
  if (
    role === Role.student &&
    typeTask === TypeTask.SubmitTask &&
    checkingTask.state === CheckState.AuditorDraft
  ) {
    return (
      <div className={styles.test}>
        <p>Check yet</p>
      </div>
    );
  }
  const [stateCheckingTask, setCheckingTask] = useState<ICheсk>(
    checkingTask || createCheckOnTask(task)
  );
  console.log(stateCheckingTask);

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
        (reviewer as IStudent).isAuditorAnonim === true &&
        role === Role.student &&
        typeTask === TypeTask.ReviewTask
      ) {
        comment.whoSaidThat = `Reviewer`;
      } else if (
        (reviewer as IStudent).isAuditorAnonim === true &&
        role === Role.student &&
        typeTask === TypeTask.SubmitTask
      ) {
        comment.whoSaidThat = `Student`;
      } else {
        comment.whoSaidThat = reviewer.name;
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

  const onSubmitCheckTask = () => {
    setCheckingTask((prev) => {
      if (prev.state === CheckState.SelfTest) {
        return {
          ...prev,
          state: CheckState.AuditorDraft,
          cheсking: changeStatePoint(prev, CheсkingPointState.NotVerified),
        };
      } else if (prev.state === CheckState.AuditorDraft) {
        return {
          ...prev,
          state: CheckState.NotVerified,
          cheсking: changeStatePoint(prev, CheсkingPointState.Verified),
        };
      } else if (prev.state === CheckState.Negotiations) {
        return {
          ...prev,
          state: CheckState.Negotiations,
        };
      } else {
        return {
          ...prev,
          state: CheckState.Negotiations,
          cheсking: changeStatePoint(prev, CheсkingPointState.NotVerified),
        };
      }
    });
    onSubmit(stateCheckingTask);
  };

  return (
    <div className={styles.test}>
      <HeaderTask
        title={task.name}
        description={task.description}
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
        isAnonim={stateCheckingTask.isAnonim}
        onChangeIsAnonim={onChangeIsAnonim}
        typeTask={typeTask}
        stateCheck={stateCheckingTask.state}
        onSave={onSaveCheckTask}
        onSubmit={onSubmitCheckTask}
      />
    </div>
  );
}

export default CheckTask;
