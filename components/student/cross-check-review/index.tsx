import React from 'react';
import { auth } from '../../../firebase';
import CheckTask from '../check-task';
import { createCheckOnReviewer } from '../check-task/common';
import { CheckState, ICheсk, IStudent, IWorkDone } from '../../../interfaces/IWorkDone';
import { ITask, TypeTask } from '../../../interfaces/ITask';
import { Role } from '../../../interfaces/IUser';
import { updateObjectField } from '../../../services/updateFirebase';
import SidebarReview from '../cross-check-review-sidebar';
import { ICourse } from '../../../interfaces/ICourse';

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

    if (tasksData.length !== 0 && courseData.length !== 0) {
      const select = tasksData.filter((taskData) => taskData.id === selectTaskID);
      if (select.length !== 0) {
        setTask(select[0]);
        const selectTaskCourse = courseData[0].tasks.filter(
          (taskData) => taskData.taskID === selectTaskID
        );
        if (selectTaskCourse.length !== 0) {
          const selectTaskStage = selectTaskCourse.map((el) => el.taskStage);
          if (selectTaskStage.length !== 0) {
            switch (selectTaskStage[0]) {
              case 'REQUESTS_GATHERING': {
                setIsDeadline(false);
                break;
              }
              case 'CROSS_CHECK': {
                setIsDeadline(true);
                break;
              }
              default: {
                setIsDeadline(false);
              }
            }
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
            const searchStudents = searchWorksDone.map((item) => {
              const searchStatus = item.cheсks.filter(
                (cheсk) => cheсk.checkerID === authorizedStudent.id
              );
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
    courseData[0] !== undefined && courseData.length !== 0
      ? courseData[0].tasks.map((task) => {
          return { name: task.name, id: task.taskID };
        })
      : [];

  return (
    <>
      <SidebarReview
        taskList={taskList}
        isDeadline={isDeadline}
        students={students}
        getTask={selectTask}
        selectStudent={selectStudent}
      />
      {taskJSX}
    </>
  );
};

export default CrossCheckReviewPage;
