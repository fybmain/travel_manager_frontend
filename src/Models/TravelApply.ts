export interface GetTravelApplyListRequest {
  page:number,
  size:number,
  state:string,
  departmentId:number,
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
