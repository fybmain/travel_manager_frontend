export const ApplyStatus = ["部门经理未审批", "总经理未审批", "审批通过", "审批未通过"];

export const FinishStatus = ["unfinished", "finished", "all"];

export interface BaseResponse {
  code: number,
  data: any,
  message: string
}

export interface CreateReimbursementRequest {
  payment: Payment,
  pictureIds: number[],
  travelApplyId: number
}

export interface GetTravelApplyListRequest {
  page:number,
  size:number,
  state:string,
  departmentId:number,
}

export interface LoginRequest {
  workId: string,
  password: string
}

export interface Payment {
  food: number,
  hotel: number,
  other: number,
  vehicle: number,
}

export interface RegisterRequest {
  email: string,
  name: string,
  password: string,
  telephone: string,
  workId: string
}

export interface ApplyBaseInfo {
  applicantName: string,
  applyId: number,
  applyTime: Date,
  departmentName: string,
  status: number
}

export interface UserInfo {
  id?: string,
  password?: string,
  workId?: string,
  name?: string,
  email?: string,
  telephone?: string,
  departmentId?: number,
  role?: number,
}
