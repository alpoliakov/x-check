import React, { useState } from 'react';
import MainLayout from '../../../../components/MainLayout';
import { auth, db } from '../../../../firebase';
import CheckTask from '../../../../components/student/check-task';
import {
  createWorkDone,
  initCrossCheckSubmit,
} from '../../../../components/student/check-task/common';
import {
  CheckState,
  ICheсk,
  IMentor,
  IStudent,
  IWorkDone,
  TaskState,
} from '../../../../interfaces/IWorkDone';
import { ITask, TypeTask } from '../../../../interfaces/ITask';
import { Role, UserBasic } from '../../../../interfaces/IUser';
import {
  deleteDocument,
  setDocument,
  updateObjectField,
} from '../../../../services/updateFirebase';
import SidebarSubmit from '../../../../components/student/cross-check-submit-sidebar';
import { ICourse, ITaskStep } from '../../../../interfaces/ICourse';
import NotAuthPage from '../../../../components/student/not-athorization-page';
import { Button } from 'antd';

interface PropsCrossCheckPage {
  usersData: UserBasic[];
  tasksData: ITask[];
  courseData: ICourse[];
  completedTasksData: IWorkDone[]; // была проблема в 56 строки, ты присваивал свойство от undefined
}
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

interface ILinks {
  deployUrl: string;
  sourceGithubRepoUrl: string;
}

const CrossCheckSubmitPage: React.FC<PropsCrossCheckPage> = ({
  usersData,
  tasksData,
  courseData,
  completedTasksData,
}) => {
  if (
    auth.currentUser !== null &&
    auth.currentUser.displayName !== null &&
    usersData.length !== 0
  ) {
    const role = Role.student;
    const typeTask = TypeTask.SubmitTask;
    let initUser: UserBasic;
    const bufID = auth.currentUser.uid;
    const initUsers = usersData.filter((user) => bufID === user.uid);
    if (initUsers.length !== undefined) {
      initUser = initUsers[0];
    } else {
      initUser = {} as UserBasic;
    }
    const activeUser = initUser;

    const [changeOutside, setChangeOutside] = useState<boolean>(false);
    const [links, setLinks] = useState<ILinks>({ deployUrl: '', sourceGithubRepoUrl: '' });
    const [checkTask, setCheckTask] = React.useState<ICheсk>({} as ICheсk);
    const [reviewer, setReviewer] = React.useState<IStudent | IMentor>({} as IStudent);
    const [crossCheckSubmit, setCrossCheckSubmit] = useState<ICrossCheckSubmit>(
      initCrossCheckSubmit(activeUser, tasksData, completedTasksData, courseData)
    );

    console.log('crossCheckSubmit', crossCheckSubmit);
    console.log('reviewer', reviewer);
    console.log('checkTask', checkTask);
    console.log('links', links);
    let taskJSX: JSX.Element = <></>;

    const selectTask = (selectTaskID: string) => {
      const selectCourseData = crossCheckSubmit.courseData.filter(
        (course) => course.task.id === selectTaskID
      );

      if (selectCourseData.length !== 0) {
        const newCrossCheckSubmit: ICrossCheckSubmit = {
          ...crossCheckSubmit,
          activeCourseData: selectCourseData[0],
        };

        if (
          newCrossCheckSubmit.activeCourseData.task !== undefined &&
          newCrossCheckSubmit.activeCourseData.taskStep.taskStage === 'REQUESTS_GATHERING' &&
          newCrossCheckSubmit.activeCourseData.workDone.id === undefined
        ) {
          setCheckTask(
            createWorkDone(newCrossCheckSubmit.activeCourseData.task, activeUser, usersData)
              .selfTest
          );
          setReviewer(
            createWorkDone(newCrossCheckSubmit.activeCourseData.task, activeUser, usersData).student
          );
        } else if (newCrossCheckSubmit.activeCourseData.workDone.state === TaskState.isSelfTest) {
          setCheckTask(newCrossCheckSubmit.activeCourseData.workDone.selfTest);
          setReviewer(newCrossCheckSubmit.activeCourseData.workDone.student);
        } else {
          setCheckTask({} as ICheсk);
          setReviewer({} as IStudent);
        }
        setChangeOutside((prev) => !prev);
        setCrossCheckSubmit((prev) => {
          return { ...prev, activeCourseData: selectCourseData[0] };
        });
      }
    };

    const selectReviewer = (selectReviewer: IStudent | IMentor) => {
      setReviewer(selectReviewer);
      const findCheckTask = crossCheckSubmit.activeCourseData.workDone.cheсks.filter(
        (item) => selectReviewer.id === item.checkerID
      );
      if (findCheckTask.length !== 0) {
        setCheckTask(findCheckTask[0]);
      } else {
        if (
          crossCheckSubmit.activeCourseData.workDone.mentorCheck.checkerID !== selectReviewer.id
        ) {
          setCheckTask(crossCheckSubmit.activeCourseData.workDone.mentorCheck);
        } else {
          setCheckTask(crossCheckSubmit.activeCourseData.workDone.selfTest);
        }
      }
    };

    const getLinks = (urls: ILinks) => {
      setLinks(urls);
    };

    const updateState = (neWworkDone: IWorkDone) => {
      setCrossCheckSubmit((prev) => {
        const updateActiveCourseData: ICourseData = {
          task: prev.activeCourseData.task,
          taskStep: prev.activeCourseData.taskStep,
          workDone: neWworkDone,
        };
        const updateCourseData: ICourseData[] = prev.courseData.map((item) => {
          if (item.task.id === updateActiveCourseData.task.id) {
            return updateActiveCourseData;
          }
          return item;
        });
        return {
          ...prev,
          activeCourseData: updateActiveCourseData,
          courseData: updateCourseData,
        };
      });
    };

    const onSave = (checkingTask: ICheсk) => {
      if (
        crossCheckSubmit.activeCourseData.workDone.id === undefined &&
        crossCheckSubmit.activeCourseData.taskStep.taskStage === 'REQUESTS_GATHERING'
      ) {
        //Сохранение новосозданного IWorkDone(самотестрирование)
        const neWworkDone: IWorkDone = {
          ...createWorkDone(crossCheckSubmit.activeCourseData.task, activeUser, usersData),
          selfTest: checkingTask,
          deployUrl: links.deployUrl,
          sourceGithubRepoUrl: links.sourceGithubRepoUrl,
        };
        setDocument('completed_tasks', neWworkDone.id, neWworkDone);
        //обновить общий стейт
        updateState(neWworkDone);
      } else if (
        crossCheckSubmit.activeCourseData.workDone.id !== undefined &&
        crossCheckSubmit.activeCourseData.taskStep.taskStage === 'REQUESTS_GATHERING'
      ) {
        //Сохранение старого IWorkDone до дедлайна
        const neWworkDone: IWorkDone = {
          ...crossCheckSubmit.activeCourseData.workDone,
          selfTest: checkingTask,
          deployUrl: links.deployUrl,
          sourceGithubRepoUrl: links.sourceGithubRepoUrl,
        };
        setDocument('completed_tasks', neWworkDone.id, neWworkDone);
        //обновить общий стейт
        updateState(neWworkDone);
      }
      setChangeOutside((prev) => !prev);
      setCheckTask(checkingTask);
    };

    const onSubmit = (checkingTask: ICheсk) => {
      if (
        crossCheckSubmit.activeCourseData.workDone.id === undefined &&
        crossCheckSubmit.activeCourseData.taskStep.taskStage === 'REQUESTS_GATHERING'
      ) {
        //Сохранение новосозданного IWorkDone(самотестрирование)
        const newCheckingTask: IWorkDone = {
          ...createWorkDone(crossCheckSubmit.activeCourseData.task, activeUser, usersData),
          selfTest: checkingTask,
          deployUrl: links.deployUrl,
          sourceGithubRepoUrl: links.sourceGithubRepoUrl,
          state: TaskState.isCheking,
        };
        //setCrossCheckSubmit();
        //добавление таска в  user
        const updateUser: UserBasic = {
          ...activeUser,
          tasksID: [...activeUser.tasksID, crossCheckSubmit.activeCourseData.task.id],
        };
        updateObjectField('users', activeUser.uid, updateUser);
        setDocument('completed_tasks', newCheckingTask.id, newCheckingTask);
        //обновить общий стейт
        updateState(newCheckingTask);
      } else if (
        crossCheckSubmit.activeCourseData.workDone.id !== undefined &&
        crossCheckSubmit.activeCourseData.taskStep.taskStage === 'REQUESTS_GATHERING'
      ) {
        //Сохранение старого IWorkDone до дедлайна
        const newCheckingTask: IWorkDone = {
          ...crossCheckSubmit.activeCourseData.workDone,
          selfTest: checkingTask,
          deployUrl: links.deployUrl,
          sourceGithubRepoUrl: links.sourceGithubRepoUrl,
          state: TaskState.isCheking,
        };
        updateObjectField('completed_tasks', newCheckingTask.id, newCheckingTask);
        //обновить общий стейт
        updateState(newCheckingTask);
      } else if (
        crossCheckSubmit.activeCourseData.workDone.id !== undefined &&
        crossCheckSubmit.activeCourseData.taskStep.taskStage === 'CROSS_CHECK' &&
        reviewer.id !== undefined &&
        checkTask.checkerID !== undefined
      ) {
        //Сохранение старого IWorkDone после дедлайна (согласование выставленной оценки)
        const updateCheck: ICheсk[] = crossCheckSubmit.activeCourseData.workDone.cheсks.map(
          (item) => {
            if (item.checkerID === checkingTask.checkerID) {
              return checkingTask;
            }
            return item;
          }
        );
        const newCheckingTask: IWorkDone = {
          ...crossCheckSubmit.activeCourseData.workDone,
          cheсks: updateCheck,
        };

        updateObjectField('completed_tasks', newCheckingTask.id, newCheckingTask);
        //обновить общий стейт
        updateState(newCheckingTask);
      }
      setChangeOutside((prev) => !prev);
      setCheckTask(checkingTask);
    };

    const deleteWorkDone = () => {
      deleteDocument('completed_tasks', crossCheckSubmit.activeCourseData.workDone.id);
      const newTasksID = activeUser.tasksID.filter(
        (item) => item !== crossCheckSubmit.activeCourseData.task.id
      );
      const updateUser: UserBasic = { ...activeUser, tasksID: newTasksID };
      updateObjectField('users', activeUser.uid, updateUser);
    };

    if (
      crossCheckSubmit.activeCourseData.workDone !== undefined &&
      checkTask.state !== undefined &&
      reviewer.id !== undefined
    ) {
      taskJSX = (
        <CheckTask
          task={crossCheckSubmit.activeCourseData.task}
          checkingTask={checkTask}
          reviewer={reviewer}
          changeOutside={changeOutside}
          deployUrl={links.deployUrl}
          sourceGithubRepoUrl={links.sourceGithubRepoUrl}
          role={role}
          typeTask={typeTask}
          onSave={onSave}
          onSubmit={onSubmit}
        />
      );
    } else if (crossCheckSubmit.activeCourseData.task === undefined) {
      taskJSX = <></>;
    }

    const taskList =
      courseData[0] !== undefined && courseData.length !== 0
        ? courseData[0].tasks.map((task) => {
            return { name: task.name, id: task.taskID };
          })
        : []; //поменять на общий стейт

    return (
      <>
        <MainLayout title="Cross-Check: Submit">
          <main className={'main__box'}>
            <div className="nav__main">
              <SidebarSubmit
                taskList={taskList}
                activeCourseData={crossCheckSubmit.activeCourseData}
                links={links}
                getLinks={getLinks}
                getTask={selectTask}
                selectReviewer={selectReviewer}
              />
              <Button
                type="primary"
                onClick={deleteWorkDone}
                disabled={crossCheckSubmit.activeCourseData.workDone === undefined}
              >
                Delete this workDone
              </Button>
            </div>
            <div className="workspace">{taskJSX}</div>
          </main>
        </MainLayout>
      </>
    );
  } else {
    return <NotAuthPage></NotAuthPage>;
  }
};

export default CrossCheckSubmitPage;

export const getServerSideProps = async () => {
  let usersData: UserBasic[] = [] as UserBasic[];
  await db
    .collection('users')
    .get()
    .then((snap) => {
      if (snap !== undefined && snap !== null) {
        usersData = snap.docs.map((doc) => doc.data()) as UserBasic[];
      } else {
        usersData = [] as UserBasic[];
      }
    });
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
    props: { usersData, tasksData, courseData, completedTasksData },
  };
};
