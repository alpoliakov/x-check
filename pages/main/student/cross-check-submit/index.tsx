import React from 'react';
import MainLayout from '../../../../components/MainLayout';
import { auth, db } from '../../../../firebase';
import CheckTask from '../../../../components/student/check-task';
import { createWorkDone } from '../../../../components/student/check-task/common';
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
import { ICourse } from '../../../../interfaces/ICourse';
import NotAuthPage from '../../../../components/student/not-athorization-page';
import { Button } from 'antd';

interface PropsCrossCheckPage {
  usersData: UserBasic[];
  tasksData: ITask[];
  courseData: ICourse[];
  completedTasksData: IWorkDone[]; // была проблема в 56 строки, ты присваивал свойство от undefined
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

    const [activeUser, setActiveUser] = React.useState<UserBasic>(initUser);
    const [changeOutside, setChangeOutside] = React.useState<boolean>(false);
    const [task, setTask] = React.useState<ITask>({} as ITask);
    const [isDeadline, setIsDeadline] = React.useState(false);
    const [workDone, setWorkDone] = React.useState<IWorkDone>({} as IWorkDone);
    const [neWworkDone, setNewWorkDone] = React.useState<IWorkDone>({} as IWorkDone);
    const [checkTask, setCheckTask] = React.useState<ICheсk>({} as ICheсk);
    const [reviewer, setReviewer] = React.useState<IStudent | IMentor>({} as IStudent);
    const [mentor, setMentor] = React.useState<IStudent>({} as IStudent);
    const [deployUrl, setDeployUrl] = React.useState<string>('');
    const [sourceGithubRepoUrl, setSourceGithubRepoUrl] = React.useState<string>('');

    console.log('activeUser', activeUser);
    console.log('task', task);
    console.log('workDone', workDone);
    console.log('neWworkDone', neWworkDone);
    console.log('isDeadline', isDeadline);
    console.log('checkTask', checkTask);
    console.log('reviewer', reviewer);

    console.log('usersData', usersData);
    console.log('tasksData', tasksData);
    console.log('courseData', courseData);
    console.log('completedTasksData', completedTasksData);
    let taskJSX: JSX.Element = <></>;

    const selectTask = (selectTaskID: string) => {
      if (
        auth.currentUser !== null &&
        auth.currentUser.displayName !== null &&
        usersData.length !== 0
      ) {
        const bufID = auth.currentUser.uid;
        const initUsers = usersData.filter((user) => bufID === user.uid);
        if (initUsers.length !== 0) {
          setActiveUser(initUsers[0]);
        }
      }
      let selectTask = {} as ITask;
      let selectWorkDone = {} as IWorkDone;
      let selectNeWworkDone = {} as IWorkDone;
      let selectIsDeadline = false;
      let selectCheckTask = {} as ICheсk;
      let selectReviewer = {} as IStudent;

      if (usersData.length !== 0 && tasksData.length !== 0 && courseData.length !== 0) {
        const select = tasksData.filter((taskData) => taskData.id === selectTaskID);
        if (select.length !== 0) {
          selectTask = select[0];
          const selectTaskCourse = courseData[0].tasks.filter(
            (taskData) => taskData.taskID === selectTaskID
          );
          if (selectTaskCourse.length !== 0) {
            const selectTaskStage = selectTaskCourse.map((el) => el.taskStage);
            if (selectTaskStage.length !== 0) {
              switch (selectTaskStage[0]) {
                case 'REQUESTS_GATHERING': {
                  selectIsDeadline = false;
                  break;
                }
                case 'CROSS_CHECK': {
                  selectIsDeadline = true;
                  break;
                }
                default: {
                  selectIsDeadline = false;
                }
              }
            }
          }

          if (completedTasksData.length !== 0) {
            const searchWorksDone = completedTasksData.filter(
              (completedTask) =>
                completedTask.taskID === select[0].id && completedTask.student.id === activeUser.uid
            );
            if (searchWorksDone.length !== 0) {
              setDeployUrl(searchWorksDone[0].deployUrl);
              setSourceGithubRepoUrl(searchWorksDone[0].sourceGithubRepoUrl);
              //тут проверка на наличие ментора в даннный момент
              if (activeUser.mentor !== undefined && activeUser.mentor !== null) {
                let mentor: IMentor;
                const bufID = activeUser.mentor.id;
                const mentors = usersData.filter((searchUser) => searchUser.uid === bufID);
                if (mentors.length !== 0) {
                  mentor = { id: activeUser.mentor.id, name: mentors[0].nickname } as IMentor;
                } else {
                  mentor = {} as IMentor;
                }
                selectWorkDone = { ...searchWorksDone[0], mentor: mentor };
              } else {
                selectWorkDone = searchWorksDone[0];
              }
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
                selectNeWworkDone = createWorkDone(selectTask, activeUser, usersData);
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
            selectNeWworkDone = createWorkDone(selectTask, activeUser, usersData);
            selectCheckTask = selectNeWworkDone.selfTest;
            selectReviewer = selectNeWworkDone.student;
          }
        } else {
          selectTask = {} as ITask;
        }
        setChangeOutside((prev) => !prev);
        setTask(selectTask);
        setWorkDone(selectWorkDone);
        setNewWorkDone(selectNeWworkDone);
        setIsDeadline(selectIsDeadline);
        setCheckTask(selectCheckTask);
        setReviewer(selectReviewer);
      }
    };

    const selectReviewer = (selectReviewer: IStudent | IMentor) => {
      setReviewer(selectReviewer);
      const findCheckTask = workDone.cheсks.filter((item) => selectReviewer.id === item.checkerID);
      if (findCheckTask.length !== 0) {
        setCheckTask(findCheckTask[0]);
      } else {
        if (workDone.mentorCheck.checkerID !== selectReviewer.id) {
          setCheckTask(workDone.mentorCheck);
        } else {
          setCheckTask(workDone.selfTest);
        }
      }
    };

    const getDeployUrl = (url: string) => {
      setDeployUrl(url);
    };

    const getSourceGithubRepoUrl = (url: string) => {
      setSourceGithubRepoUrl(url);
    };
    const onSave = (checkingTask: ICheсk) => {
      if (workDone.id === undefined && !isDeadline && neWworkDone.id !== undefined) {
        //Сохранение новосозданного IWorkDone(самотестрирование)
        const newCheckingTask: IWorkDone = {
          ...neWworkDone,
          selfTest: checkingTask,
          deployUrl: deployUrl,
          sourceGithubRepoUrl: sourceGithubRepoUrl,
        };
        setDocument('completed_tasks', newCheckingTask.id, newCheckingTask);
      } else if (workDone.id !== undefined && !isDeadline && neWworkDone.id === undefined) {
        //Сохранение старого IWorkDone до дедлайна
        const newCheckingTask: IWorkDone = {
          ...workDone,
          selfTest: checkingTask,
          deployUrl: deployUrl,
          sourceGithubRepoUrl: sourceGithubRepoUrl,
        };
        updateObjectField('completed_tasks', newCheckingTask.id, newCheckingTask);
      }
    };

    const onSubmit = (checkingTask: ICheсk) => {
      if (workDone.id === undefined && !isDeadline && neWworkDone.id !== undefined) {
        //Сохранение новосозданного IWorkDone(самотестрирование)
        const newCheckingTask: IWorkDone = {
          ...neWworkDone,
          selfTest: checkingTask,
          deployUrl: deployUrl,
          state: TaskState.isCheking,
          sourceGithubRepoUrl: sourceGithubRepoUrl,
        };
        setWorkDone(newCheckingTask);
        //добавление таска в  user
        setDocument('completed_tasks', newCheckingTask.id, newCheckingTask);
      } else if (workDone.id !== undefined && !isDeadline && neWworkDone.id === undefined) {
        //Сохранение старого IWorkDone до дедлайна
        const newCheckingTask: IWorkDone = {
          ...workDone,
          selfTest: checkingTask,
          deployUrl: deployUrl,
          state: TaskState.isCheking,
          sourceGithubRepoUrl: sourceGithubRepoUrl,
        };

        setWorkDone(newCheckingTask);
        updateObjectField('completed_tasks', newCheckingTask.id, newCheckingTask);
      } else if (
        workDone.id !== undefined &&
        isDeadline &&
        neWworkDone.id === undefined &&
        reviewer.id !== undefined &&
        checkTask.checkerID !== undefined
      ) {
        //Сохранение старого IWorkDone после дедлайна (согласование выставленной оценки)
        const updateCheck: ICheсk[] = workDone.cheсks.map((item) => {
          if (item.checkerID === checkingTask.checkerID) {
            return checkingTask;
          }
          return item;
        });
        const newCheckingTask: IWorkDone = {
          ...workDone,
          cheсks: updateCheck,
        };
        setWorkDone(newCheckingTask);
        updateObjectField('completed_tasks', newCheckingTask.id, newCheckingTask);
      }
      setChangeOutside((prev) => !prev);
      setCheckTask(checkingTask);
    };

    if (task.id !== undefined && reviewer.id !== undefined && checkTask.checkerID !== undefined) {
      taskJSX = (
        <CheckTask
          task={task}
          checkingTask={checkTask}
          reviewer={reviewer}
          changeOutside={changeOutside}
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

    const taskList =
      courseData[0] !== undefined && courseData.length !== 0
        ? courseData[0].tasks.map((task) => {
            return { name: task.name, id: task.taskID };
          })
        : [];

    return (
      <>
        <MainLayout title="Cross-Check: Submit">
          <main className={'main__box'}>
            <div className="nav__main">
              <SidebarSubmit
                getTask={selectTask}
                taskList={taskList}
                workDone={workDone}
                isActiveTask={task.name !== undefined}
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
