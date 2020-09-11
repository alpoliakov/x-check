export interface UserBasic {
  id: number;
  githubAddress: string;
  name: string;
  rank: 'student' | 'mentor' | 'admin';
}

export interface MentorBasic extends UserBasic {
  students: (StudentBasic | { id: number })[];
  courseId: number;
  courseName: string;
}

export interface StudentBasic extends UserBasic {
  isActive: boolean;
  mentor: MentorBasic | { id: number } | null;
  courseId: number;
  courseName: string;
  tasksID: ITaskInfo[];
}

export interface ITaskInfo {
  taskID: number;
  taskName: string;
}
