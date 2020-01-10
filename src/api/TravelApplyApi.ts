import axios from '../axios';
import { TravelApplyItem, TravelApplyRequest, TravelApplyDetail } from '../Models';
import { AxiosResponse } from 'axios';

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
    departmentId: number,
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
          departmentId,
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

  static async getTravelApplicationDetail(applyId: number): Promise<
    { message: "ok", data: TravelApplyDetail }
    |{ message: "network error"|"unknown error" }
  > {
    let result: AxiosResponse;
    try{
      result = await axios.get("api/travel/application", {
        params: {
          applyId,
        }
      });
    }catch(err){
      if(err.response){
        return { message: "unknown error" };
      }else{
        return { message: "network error" };
      }
    }
    if(result.data.code===0) {
      return {
        message: "ok",
        data: {
          id: result.data.data.id,
          applyTime: new Date(result.data.data.applyTime),
          applicantId: result.data.data.applicantId,
          applicantName: result.data.data.applicantName,
          departmentId: result.data.data.departmentId,
          departmentName: result.data.data.departmentName,
          startTime: new Date(result.data.data.startTime),
          endTime: new Date(result.data.data.endTime),
          address: {
            province: result.data.data.province,
            city: result.data.data.city,
            detail: result.data.data.detailAddress,
          },
          paid: result.data.data.paid,
          budget: {
            food: result.data.data.foodBudget,
            hotel: result.data.data.hotelBudget,
            vehicle: result.data.data.vehicleBudget,
            other: result.data.data.otherBudget,
          },
          reason: result.data.data.reason,
          status: result.data.data.status,
        },
      };
    }else{
      return{ message: "unknown error" };
    }
  }

  static async createTravelApplication(request: TravelApplyRequest) {
    const requestBody = {
      province: request.address.province,
      city: request.address.city,
      detailAddress: request.address.detail,
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
    if(result.data.code===0){
      return { message: "ok" };
    }else{
      return { message: "unknown error" };
    }
  }

  static async setTravelApplyApprovalStatus(applyId: number, approve: boolean) {
    let result;
    try{
      result = await axios.put("api/travel/approval", {
        applyId,
        approved: approve,
      });
    }catch(err){
      if(err.response){
        return { message: "network error" };
      }else{
        return { message: "unknown error" };
      }
    }
    if(result.data.code===0){
      return { message: "ok" };
    }else{
      return { message: "unknown error" };
    }
  }
}
