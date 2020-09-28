export interface UserBasic {
  uid: string;
  githubAddress: string;
  name: string;
  role: Role;
  avatar_url?: string | undefined;
}

export interface MentorBasic extends UserBasic {
  students: string[];
  courseId?: number;
  courseName?: string;
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
