export const ApplyStatus = ["","部门经理未审批", "总经理未审批", "审批通过", "部门经理审批未通过", "总经理审批未通过"];

export const FinishStatus = ["unfinished", "finished", "all"];

export interface ApplyBaseInfo {
  applicantName: string,
  applyId: number,
  applyTime: Date,
  departmentName: string,
  status: number
}

export const reimbursementApplyStatusToString = (reimbursementApplyStatus: number) => {
  return ApplyStatus[reimbursementApplyStatus];
}
