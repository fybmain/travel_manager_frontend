
export interface UserInfo {
    id: string,
    key: string,
    workId: string,
    name: string,
    email: string,
    telephone: string,
    department: string,
}

export interface TravelApplyInfo{
    id:number;

}

export const ApplyStatus=["部门经理未审批","总经理未审批","审批通过","审批未通过"];