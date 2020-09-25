export interface UserBasic {
  id: string;
  githubAddress: string;
  name: string;
  role: Role;
}

export interface MentorBasic extends UserBasic {
  students: (StudentBasic | { id: number })[];
  courseId: number;
  courseName: string;
}

export interface StudentBasic extends UserBasic {
  isActive: boolean;
  mentor: MentorBasic | { id: number } | null;
  courseId: string;
  courseName: string;
  tasksID: ITaskInfo[];
}

export interface ITaskInfo {
  taskID: string;
  taskName: string;
}

export enum Role {
  student,
  mentor,
  admin,
}
