import React from 'react';
import MainLayout from '../../../../components/MainLayout';
import { auth, db } from '../../../../firebase';
import CheckTask from '../../../../components/student/check-task';
import { dataCourse } from '../../../../components/student/test-task/test-course';
import {
  createCheckOnReviewer,
  createMentorCheck,
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
import {
  deleteDocument,
  setDocument,
  updateObjectField,
} from '../../../../services/updateFirebase';
import SidebarReview from '../../../../components/student/cross-check-review-sidebar';
import { ICourse } from '../../../../interfaces/ICourse';

interface PropsCrossCheckPage {
  tasksData: ITask[];
  courseData: ICourse[];
  completedTasksData: IWorkDone[];
}

interface IStudentStatus {
  student: IStudent;
  status: CheckState;
}

const CrossCheckReviewPage: React.FC<PropsCrossCheckPage> = ({
  tasksData,
  courseData,
  completedTasksData,
}) => {
  const role = Role.student;
  const typeTask = TypeTask.ReviewTask;
  let authorizedStudent = {} as IStudent;

  if (auth.currentUser !== null && auth.currentUser.displayName !== null) {
    authorizedStudent = {
      id: auth.currentUser.uid,
      name: auth.currentUser.displayName,
      isAuditorAnonim: false,
    };
  }
  const [task, setTask] = React.useState<ITask>({} as ITask);
  const [changeOutside, setChangeOutside] = React.useState<boolean>(false);
  const [isDeadline, setIsDeadline] = React.useState(false);
  const [activeCheckTask, setActiveCheckTask] = React.useState<ICheсk>({} as ICheсk);
  const [students, setStudents] = React.useState<IStudentStatus[]>([]);
  const [activeWorkDone, setActiveWorkDone] = React.useState<IWorkDone>({} as IWorkDone);
  const [worksDone, setworksDone] = React.useState<IWorkDone[]>([]);

  console.log('tasksData', tasksData);
  console.log('courseData', courseData);
  console.log('completedTasksData', completedTasksData);
  console.log('activeCheckTask', activeCheckTask);
  console.log('students', students);
  console.log('activeWorkDone', activeWorkDone);
  console.log('isDeadline', isDeadline);

  let taskJSX: JSX.Element = <></>;

  const onSave = (checkingTask: ICheсk) => {
    let saveWorkDone: IWorkDone;
    if (
      activeWorkDone.cheсks.filter((item) => item.checkerID === checkingTask.checkerID).length !== 0
    ) {
      const updateCheck = activeWorkDone.cheсks.map((item) => {
        if (item.checkerID === checkingTask.checkerID) {
          return checkingTask;
        }
        return item;
      });
      saveWorkDone = { ...activeWorkDone, cheсks: updateCheck };
    } else {
      saveWorkDone = { ...activeWorkDone, cheсks: [...activeWorkDone.cheсks, checkingTask] };
    }
    updateObjectField('completed_tasks', saveWorkDone.id, saveWorkDone);
  };

  const onSubmit = (checkingTask: ICheсk) => {
    let submitWorkDone: IWorkDone;
    if (
      activeWorkDone.cheсks.filter((item) => item.checkerID === checkingTask.checkerID).length !== 0
    ) {
      const updateCheck = activeWorkDone.cheсks.map((item) => {
        if (item.checkerID === checkingTask.checkerID) {
          return checkingTask;
        }
        return item;
      });
      submitWorkDone = { ...activeWorkDone, cheсks: updateCheck };
    } else {
      submitWorkDone = { ...activeWorkDone, cheсks: [...activeWorkDone.cheсks, checkingTask] };
    }
    updateObjectField('completed_tasks', submitWorkDone.id, submitWorkDone);
    setActiveCheckTask(checkingTask);
    const newStudents = students.map((item) => {
      if (item.student.id === activeWorkDone.student.id) {
        return { ...item, status: checkingTask.state };
      }
      return item;
    });
    setStudents(newStudents);
  };

  const selectTask = (selectTaskID: string) => {
    if (auth.currentUser !== null && auth.currentUser.displayName !== null) {
      authorizedStudent = {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        isAuditorAnonim: false,
      };
    }

    if (tasksData.length !== 0 && dataCourse.length !== 0) {
      const select = tasksData.filter((taskData) => taskData.id === selectTaskID);
      if (select.length !== 0) {
        setTask(select[0]);
        const selectTaskDeadline = dataCourse[0].tasks.filter(
          (taskData) => taskData.taskID === selectTaskID
        );
        if (selectTaskDeadline.length !== 0) {
          const selectTaskDeadline1 = selectTaskDeadline.map((el) => el.deadline)[0];
          const date = new Date().getTime();
          if (selectTaskDeadline1 < date) {
            setIsDeadline(true);
          } else {
            setIsDeadline(false);
          }
        }

        if (completedTasksData.length !== 0) {
          const searchWorksDone = completedTasksData.filter((completedTask) => {
            return (
              completedTask.reviewers.filter((item) => item.id === authorizedStudent.id).length !==
                0 && completedTask.taskID === select[0].id
            );
          });
          if (searchWorksDone.length !== 0) {
            console.log('searchWorksDone', searchWorksDone);
            const searchStudents = searchWorksDone.map((item) => {
              const searchStatus = item.cheсks.filter(
                (cheсk) => cheсk.checkerID === authorizedStudent.id
              );
              console.log('searchStatus', searchStatus);
              let status: CheckState;
              if (searchStatus.length !== 0) {
                status = searchStatus[0].state;
              } else {
                status = CheckState.AuditorDraft;
              }
              return { student: item.student, status: status };
            });
            setStudents(searchStudents);
            setActiveWorkDone({} as IWorkDone);
            setActiveCheckTask({} as ICheсk);
          } else {
            setStudents([]);
            setActiveWorkDone({} as IWorkDone);
            setActiveCheckTask({} as ICheсk);
          }
        } else {
          setStudents([]);
          setActiveWorkDone({} as IWorkDone);
          setActiveCheckTask({} as ICheсk);
        }
      } else {
        setTask({} as ITask);
        setStudents([]);
        setActiveWorkDone({} as IWorkDone);
        setActiveCheckTask({} as ICheсk);
      }
    }
  };

  const selectStudent = (student: IStudent) => {
    if (auth.currentUser !== null && auth.currentUser.displayName !== null) {
      authorizedStudent = {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        isAuditorAnonim: false,
      };
    }

    if (completedTasksData.length !== 0) {
      const searchWorkDone = completedTasksData.filter((completedTask) => {
        return (
          completedTask.reviewers.filter((item) => item.id === authorizedStudent.id).length !== 0 &&
          completedTask.taskID === task.id &&
          completedTask.student.id === student.id
        );
      });
      console.log('searchWorkDone', searchWorkDone);
      if (searchWorkDone.length !== 0) {
        //фича для удаления
        // deleteDocument('completed_tasks', searchWorkDone[0].id);

        setActiveWorkDone(searchWorkDone[0]);
        const findCheckingTask = searchWorkDone[0].cheсks.filter(
          (item) => student.id === item.checkerID
        );
        if (findCheckingTask.length !== 0) {
          setActiveCheckTask(findCheckingTask[0]);
        } else {
          console.log('searchWorkDone', searchWorkDone[0]);
          setActiveCheckTask(createCheckOnReviewer(task, searchWorkDone[0], authorizedStudent));
        }
      } else {
        setActiveWorkDone({} as IWorkDone);
        setActiveCheckTask({} as ICheсk);
      }
    } else {
      setStudents([]);
      setActiveWorkDone({} as IWorkDone);
      setActiveCheckTask({} as ICheсk);
    }
    setChangeOutside((prev) => !prev);
  };

  if (
    task.id !== undefined &&
    authorizedStudent.id !== undefined &&
    activeCheckTask.checkerID !== undefined
  ) {
    taskJSX = (
      <CheckTask
        task={task}
        checkingTask={activeCheckTask}
        reviewer={authorizedStudent}
        changeOutside={changeOutside}
        deployUrl={''}
        sourceGithubRepoUrl={''}
        role={role}
        typeTask={typeTask}
        onSave={onSave}
        onSubmit={onSubmit}
      />
    );
  } else {
    taskJSX = <></>;
  }

  const taskList =
    dataCourse !== undefined
      ? /*courseData[0]*/ dataCourse[0].tasks.map((task) => {
          return { name: task.name, id: task.taskID };
        })
      : [];

  return (
    <>
      <MainLayout title="Cross-Check: Review">
        <main className={'main__box'}>
          <div className="nav__main">
            <SidebarReview
              taskList={taskList}
              isDeadline={isDeadline}
              students={students}
              getTask={selectTask}
              selectStudent={selectStudent}
            />
          </div>
          <div className="workspace">{taskJSX}</div>
        </main>
      </MainLayout>
    </>
  );
};

export default CrossCheckReviewPage;

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
