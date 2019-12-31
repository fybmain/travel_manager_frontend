
export interface UserInfo {
    id?: string,
    password?: string,
    workId?: string,
    name?: string,
    email?: string,
    telephone?: string,
    department?: string,
}

export interface TravelApplyInfo{
    id:number;

}

export const ApplyStatus=["部门经理未审批","总经理未审批","审批通过","审批未通过"];


//wyt start
export interface RegisterRequest{
  email: string,
  name: string,
  password: string,
  telephone: string,
  workId: string
}

export interface LoginRequest{
    workId: string,
    password: string
  }

export interface BaseResponse{
  code: number,
  data: any,
  message: string
}

//wyt end
