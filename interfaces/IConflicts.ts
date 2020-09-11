export interface IDispute {
  workDoneID: number;
  conflicts: IConflict[];
  checker: string;
}

export interface IConflict {
  groupID: number;
  itemID: number;
}
