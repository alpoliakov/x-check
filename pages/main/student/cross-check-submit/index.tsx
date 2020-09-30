import React from 'react';
import MainLayout from '../../../../components/MainLayout';
import { auth, db } from '../../../../firebase';
import { Row, Col } from 'antd';
import CheckTask from '../../../../components/student/check-task';
import { checkingTask, user } from '../../../../components/student/test-task/test-work-done';
import { testTask } from '../../../../components/student/test-task/test-task';
import { selfCheckingTask } from '../../../../components/student/test-task/selftest-work-done';
import { dataCourse } from '../../../../components/student/test-task/test-course';
import {
  createCheckOnReviewer,
  createMentorCheck,
  createTask,
} from '../../../../components/student/check-task/common';
import {
  CheckState,
  ICheсk,
  IStudent,
  IWorkDone,
  TaskState,
} from '../../../../interfaces/IWorkDone';
import { ITask, TypeTask } from '../../../../interfaces/ITask';
import { Role } from '../../../../interfaces/IUser';
import { deleteDocument, setDocument } from '../../../../services/updateFirebase';
import { ICourse } from '../../../../interfaces/ICourse';
import Sidebar from '../../../../components/student/cross-check/Sidebar';
interface PropsCrossCheckPage {
  tasksData: ITask[];
  courseData: ICourse[];
  completedTasksData: IWorkDone[]; // была проблема в 56 строки, ты присваивал свойство от undefined
}

const CrossCheckPage: React.FC<PropsCrossCheckPage> = ({
  tasksData,
  courseData,
  completedTasksData,
}) => {
  const role = Role.student;
  const typeTask = TypeTask.SubmitTask;
  if (auth.currentUser !== null) {
    console.log(auth.currentUser.uid);
    console.log(auth.currentUser.displayName);
  }
  const [task, setTask] = React.useState<ITask>({} as ITask);
  const [isDeadline, setIsDeadline] = React.useState(false);
  const [workDone, setWorkDone] = React.useState<IWorkDone>({} as IWorkDone);
  const [neWworkDone, setNewWorkDone] = React.useState<IWorkDone>({} as IWorkDone);
  const [checkTask, setCheckTask] = React.useState<ICheсk>({} as ICheсk);
  const [reviewer, setReviewer] = React.useState<IStudent>({} as IStudent);
  const [deployUrl, setDeployUrl] = React.useState<string>('');
  const [sourceGithubRepoUrl, setSourceGithubRepoUrl] = React.useState<string>('');

  // console.log('task', task);
  // console.log('workDone', workDone);
  // console.log('neWworkDone', neWworkDone);
  // console.log('isDeadline', isDeadline);
  // console.log('checkTask', checkTask);
  // console.log('reviewer', reviewer);

  // console.log('tasksData', tasksData);
  // console.log('courseData', courseData);
  // console.log('completedTasksData', completedTasksData);
  let taskJSX: JSX.Element = <></>;

  const onSave = (checkingTask: ICheсk) => {
    if (workDone.id === undefined && !isDeadline && neWworkDone.id !== undefined) {
      //Сохранение новосозданного IWorkDone(самотестрирование)
      const newCheckingTask = {
        ...neWworkDone,
        selfTest: checkingTask,
        deployUrl: deployUrl,
        sourceGithubRepoUrl: sourceGithubRepoUrl,
      };
      console.log('Save in Data 1', newCheckingTask);
      // setDocument('completed_tasks', newCheckingTask.id, newCheckingTask);
      // deleteDocument('completed_tasks', newCheckingTask.id, newCheckingTask);
    } else if (workDone.id !== undefined && !isDeadline && neWworkDone.id === undefined) {
      //Сохранение старого IWorkDone до дедлайна
      const newCheckingTask = {
        ...workDone,
        selfTest: checkingTask,
        deployUrl: deployUrl,
        sourceGithubRepoUrl: sourceGithubRepoUrl,
      };
      console.log('Save in Data 2', newCheckingTask);
      //updateObjectField('completed_tasks', newCheckingTask.id, newCheckingTask);
    } else if (
      workDone.id !== undefined &&
      isDeadline &&
      neWworkDone.id === undefined &&
      reviewer.id !== undefined &&
      checkTask.checkerID !== undefined
    ) {
      //Сохранение старого IWorkDone после дедлайна (согласование выставленной оценки)
      const updateCheck = workDone.cheсks.map((item) => {
        if (item.checkerID === checkingTask.checkerID) {
          return checkingTask;
        }
        return item;
      });
      const newCheckingTask = {
        ...workDone,
        checks: updateCheck,
      };
      console.log('Save in Data', newCheckingTask);
    }
  };

  const onSubmit = (checkingTask: ICheсk) => {
    console.log('Change and save in Data', checkingTask);
    if (workDone.id === undefined && !isDeadline && neWworkDone.id !== undefined) {
      const newCheckingTask = {
        ...neWworkDone,
        selfTest: checkingTask,
        deployUrl: deployUrl,
        sourceGithubRepoUrl: sourceGithubRepoUrl,
      };
      console.log('Save in Data', newCheckingTask);
    } else if (workDone.id !== undefined && !isDeadline && neWworkDone.id === undefined) {
      const newCheckingTask = {
        ...workDone,
        selfTest: checkingTask,
        deployUrl: deployUrl,
        sourceGithubRepoUrl: sourceGithubRepoUrl,
      };
      console.log('Save in Data', newCheckingTask);
    }
  };

  const getDeployUrl = (url: string) => {
    setDeployUrl(url);
  };
  const getSourceGithubRepoUrl = (url: string) => {
    setSourceGithubRepoUrl(url);
  };
  const selectTask = (selectTaskID: string) => {
    // setDocument('sessions', dataCourse.id, dataCourse);
    // deleteDocument('sessions', dataCourse.id);

    // setDocument('TasksArray', testTask.id, testTask);
    // deleteDocument('TasksArray', testTask.id);
    let selectTask = {} as ITask;
    let selectWorkDone = {} as IWorkDone;
    let selectNeWworkDone = {} as IWorkDone;
    let selectIsDeadline = false;
    let selectCheckTask = {} as ICheсk;
    let selectReviewer = {} as IStudent;
    if (tasksData.length !== 0 && dataCourse.length !== 0) {
      const select = tasksData.filter((taskData) => taskData.id === selectTaskID);
      if (select.length !== 0) {
        selectTask = select[0];
        const selectTaskDeadline = dataCourse[0].tasks.filter(
          (taskData) => taskData.taskID === selectTaskID
        );
        if (selectTaskDeadline.length !== 0) {
          const selectTaskDeadline1 = selectTaskDeadline.map((el) => el.deadline)[0];
          const date = new Date().getTime();
          if (selectTaskDeadline1 < date) {
            selectIsDeadline = true;
          } else {
            selectIsDeadline = false;
          }
        }

        if (completedTasksData.length !== 0) {
          const searchWorksDone = completedTasksData.filter(
            (completedTask) => completedTask.taskID === select[0].id
          );
          if (searchWorksDone.length !== 0) {
            setDeployUrl(searchWorksDone[0].deployUrl);
            setSourceGithubRepoUrl(searchWorksDone[0].sourceGithubRepoUrl);

            selectWorkDone = searchWorksDone[0];
            selectNeWworkDone = {} as IWorkDone;
            if (!selectIsDeadline) {
              //этап правки самопроверки
              selectCheckTask = searchWorksDone[0].selfTest;
              selectReviewer = searchWorksDone[0].student;
            } else {
              //этап согласования оценок никого не выбираем
              selectCheckTask = {} as ICheсk;
              selectReviewer = {} as IStudent;
            }
          } else {
            if (!selectIsDeadline) {
              //этап создания самопроверки
              selectWorkDone = {} as IWorkDone;
              selectNeWworkDone = createTask(selectTask, user);
              selectCheckTask = selectNeWworkDone.selfTest;
              selectReviewer = selectNeWworkDone.student;
            } else {
              // этап не засабмиченной работы
              selectWorkDone = {} as IWorkDone;
              selectNeWworkDone = {} as IWorkDone;
              selectCheckTask = {} as ICheсk;
              selectReviewer = {} as IStudent;
            }
          }
        } else {
          selectWorkDone = {} as IWorkDone;
          selectNeWworkDone = createTask(selectTask, user);
        }
      } else {
        selectTask = {} as ITask;
      }
      setTask(selectTask);
      setWorkDone(selectWorkDone);
      setNewWorkDone(selectNeWworkDone);
      setIsDeadline(selectIsDeadline);
      setCheckTask(selectCheckTask);
      setReviewer(selectReviewer);
    }
  };

  if (task.id !== undefined && reviewer.id !== undefined && checkTask.checkerID !== undefined) {
    taskJSX = (
      <CheckTask
        task={task}
        checkingTask={checkTask}
        reviewer={reviewer}
        deployUrl={deployUrl}
        sourceGithubRepoUrl={sourceGithubRepoUrl}
        role={role}
        typeTask={typeTask}
        onSave={onSave}
        onSubmit={onSubmit}
      />
    );
  } else if (
    task.id === undefined ||
    reviewer.id === undefined ||
    checkTask.checkerID === undefined
  ) {
    taskJSX = <></>;
  }

  const selectReviewer = (reviewer: IStudent) => {
    setReviewer(reviewer);
    const findCheckTask = workDone.cheсks.filter((item) => reviewer.id === item.checkerID);
    if (findCheckTask.length !== 0) {
      setCheckTask(findCheckTask[0]);
    } else {
      setCheckTask(workDone.selfTest);
    }
  };

  const taskList =
    dataCourse !== undefined
      ? /*courseData[0]*/ dataCourse[0].tasks.map((task) => {
          return { name: task.name, id: task.taskID };
        })
      : [];

  return (
    <>
      <MainLayout title="Cross-Check: Submit">
        <main className={'main__box'}>
          <div className="nav__main">
            <Sidebar
              getTask={selectTask}
              taskList={taskList}
              workDone={workDone}
              reviewer={reviewer}
              isDeadline={isDeadline}
              deployUrl={deployUrl}
              sourceGithubRepoUrl={sourceGithubRepoUrl}
              getDeployUrl={getDeployUrl}
              getSourceGithubRepoUrl={getSourceGithubRepoUrl}
              selectReviewer={selectReviewer}
            />
          </div>
          <div className="workspace">{taskJSX}</div>
        </main>
      </MainLayout>
    </>
  );
};

export default CrossCheckPage;

export const getServerSideProps = async () => {
  let tasksData: ITask[] = [] as ITask[];
  await db
    .collection('TasksArray')
    .get()
    .then((snap) => {
      if (snap !== undefined && snap !== null) {
        tasksData = snap.docs.map((doc) => doc.data()) as ITask[];
      } else {
        tasksData = [] as ITask[];
      }
    });
  let courseData: ICourse[] = [] as ICourse[];
  await db
    .collection('sessions')
    .get()
    .then((snap) => {
      if (snap !== undefined && snap !== null) {
        courseData = snap.docs.map((doc) => doc.data()) as ICourse[];
      } else {
        courseData = [] as ICourse[];
      }
    });

  let completedTasksData: IWorkDone[] = [] as IWorkDone[];
  await db
    .collection('completed_tasks')
    .get()
    .then((snap) => {
      if (snap !== undefined && snap !== null) {
        completedTasksData = snap.docs.map((doc) => doc.data()) as IWorkDone[];
      } else {
        completedTasksData = [] as IWorkDone[];
      }
    });

  return {
    props: { tasksData, courseData, completedTasksData },
  };
};
