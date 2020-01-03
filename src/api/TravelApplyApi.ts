import axios from '../axios';
import { TravelApplyItem, TravelApplyDetail, TravelApplyRequest } from '../Models/AllModels';
import { AxiosResponse } from 'axios';
import UserInfoStore from '../Stores/UserInfoStore';

export class TravelApplyApi {
  static async getTravelApplicationListForUser(
    pageSize: number,
    page: number,
    state: "all"|"finished"|"unfinished"
  ): Promise<
    {message: "ok", total: number, items: TravelApplyItem[]}
    |{message: "network error"|"unknown error"}
  > {
    let result: AxiosResponse;
    try{
      result = await axios.get("api/travel/applications/me", {
        params: {
          page,
          size: pageSize,
          state,
        }
      });
    }catch(err){
      if(err.response){
        return { message: "unknown error" };
      }else{
        return { message: "network error" };
      }
    }
    const items: any[] = result.data.data.items;
    return {
      message: "ok",
      total: result.data.data.total,
      items: items.map((value): TravelApplyItem => ({
        applyId: value.applyId,
        applyTime: new Date(value.applyTime),
        applicantName: value.applicantName,
        departmentName: value.departmentName,
        status: value.status,
      })),
    };
  }

  static async getTravelApplicationListForApprover(
    pageSize: number,
    page: number,
    state: "all"|"finished"|"unfinished"
  ): Promise<
    {message: "ok", total: number, items: TravelApplyItem[]}
    |{message: "network error"|"unknown error"}
  > {
    let result: AxiosResponse;
    try{
      result = await axios.get("api/travel/applications", {
        params: {
          page,
          size: pageSize,
          state,
          departmentId: UserInfoStore.userInfo.departmentId,
        }
      });
    }catch(err){
      if(err.response){
        return { message: "unknown error" };
      }else{
        return { message: "network error" };
      }
    }
    const items: any[] = result.data.data.items;
    return {
      message: "ok",
      total: result.data.data.total,
      items: items.map((value): TravelApplyItem => ({
        applyId: value.applyId,
        applyTime: new Date(value.applyTime),
        applicantName: value.applicantName,
        departmentName: value.departmentName,
        status: value.status,
      })),
    };
  }

  static async createTravelApplication(request: TravelApplyRequest) {
    const requestBody = {
      city: request.city,
      province: request.province,
      startTime: request.startTime.toISOString(),
      endTime: request.endTime.toISOString(),
      budget: {
        food: request.budget.food,
        hotel: request.budget.hotel,
        vehicle: request.budget.vehicle,
        other: request.budget.other,
      },
      reason: request.reason,
    };
    let result;
    try{
      result = await axios.post("api/travel/application", requestBody);
    }catch(err){
      if(err.response){
        return { message: "unknown error" };
      }else{
        return { message: "network error" };
      }
    }
    if(result.data.code==0){
      return { message: "ok" };
    }else{
      return { message: "unknown error" };
    }
  }
}
