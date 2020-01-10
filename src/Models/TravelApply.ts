import { Address } from './Address';

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
  address: Address,
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
  address: Address,
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
  DepartmentManagerRejected = 4,
  GeneralManagerRejected = 5,
}

export const isApplicationDone = (travelApplyStatus: TravelApplyStatus) => {
  switch(travelApplyStatus){
    case TravelApplyStatus.ApplicationApproved:
    case TravelApplyStatus.DepartmentManagerRejected:
    case TravelApplyStatus.GeneralManagerRejected:
      return true;
    default:
      return false;
  }
}

export const travelApplyStatusToString = (travelApplyStatus: TravelApplyStatus) => {
  switch(travelApplyStatus){
    case TravelApplyStatus.NeedDepartmentManagerApproval:
      return '待部门经理审批';
    case TravelApplyStatus.NeedGeneralManagerApproval:
      return '待总经理审批';
    case TravelApplyStatus.ApplicationApproved:
      return '审批通过';
    case TravelApplyStatus.DepartmentManagerRejected:
      return '部门经理驳回';
    case TravelApplyStatus.GeneralManagerRejected:
      return '总经理驳回';
  };
}
