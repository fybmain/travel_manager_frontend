export const ApplyStatus=["部门经理未审批","总经理未审批","审批通过","审批未通过"];

export interface BaseResponse{
  code: number,
  data: any,
  message: string
}

export interface LoginRequest{
    workId: string,
    password: string
  }

export interface RegisterRequest{
  email: string,
  name: string,
  password: string,
  telephone: string,
  workId: string
}

export interface TravelApplyDetail {
  id:number,
  applyTime: Date,
  applicantId: number,
  applicantName: string,
  departmentId: number,
  departmentName: string,
  startTime: Date,
  endTime: Date,
  province: string,
  city: string,
  paid: boolean,
  budget: {
    food: number,
    hotel: number,
    vehicle: number,
    other: number,
  },
  reason: string,
  status: TravelApplyStatus,
}

export interface TravelApplyItem {
  applyId: number,
  applyTime: Date,
  applicantName: string,
  departmentName: string,
  status: number,
}

export interface TravelApplyRequest {
  city: string,
  province: string,
  startTime: Date,
  endTime: Date,
  budget: {
    food: number,
    hotel: number,
    vehicle: number,
    other: number,
  },
  reason: string,
}

export enum TravelApplyStatus {
  NeedDepartmentManagerApproval = 1,
  NeedGeneralManagerApproval = 2,
  ApplicationApproved = 3,
  ApplicationNotApproved =4,
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
