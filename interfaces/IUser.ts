export interface UserBasic {
  uid: string;
  githubAddress: string;
  nickname: string;
  role: Role;
  avatar_url?: string | undefined;
  studentsid: string[] | [];
  mentor?: { id: string } | null;
  tasksID: string[];
}

export enum Role {
  student,
  mentor,
  admin,
}
