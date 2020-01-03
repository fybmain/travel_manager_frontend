import axios from '../axios';
import { ApplyBaseInfo, CreateReimbursementRequest, GetTravelApplyListRequest } from '../Models/AllModels';

export class ReimbursementApi {
  static async createReimbursementApply(request:CreateReimbursementRequest): Promise<{message:string}>{
    try{
      const result= await axios.post("api/payment/application",request);
      console.log(result);
      return {message:"ok"};
    }catch(e){
      switch(e.response.status){
        case 403: return {message:"无权限"};
        case 404: return {message:`未找到ID${request.travelApplyId}对应出差申请`};
        default: return {message:"unknown exception"};
      }
    }
  }

  static async getUnpaidTravelApplyList(request:{page:number,size:number}): Promise<{items?:ApplyBaseInfo[],total?:number,message:string}>{
    try{
      const result= await axios.get("api/travel/applications/unpaid",{params:request});
      console.log(result);
      return {
        items:result.data.data.items,
        total:result.data.data.total,
        message:"ok"
      }
    }catch(e){
      switch(e.response.status){
        //case 400: return {message:"state must be Finished, Unfinished or All"};
        default: return {message:"unknown exception"};
      }
    }
  }

  static async getMyReimbursementApplyList(request:{page:number,size:number,state:string}): Promise<{items?:ApplyBaseInfo[],total?:number,message:string}>{
    try{
      const result= await axios.get("api/payment/applications/me",{params:request});
      console.log(result);
      return {
        items:result.data.data.items,
        total:result.data.data.total,
        message:"ok"
      }
    }catch(e){
      switch(e.response.status){
        case 400: return {message:"请求参数错误"};
        default: return {message:"unknown exception"};
      }
    }
  }

  static async getReimbursementApplyList(request:GetTravelApplyListRequest): Promise<{items?:ApplyBaseInfo[],total?:number,message:string}>{
    try{
      const result= await axios.get("api/travel/applications",{params:request});
      console.log(result);
      return {
        items:result.data.data.items,
        total:result.data.data.total,
        message:"ok"
      }
    }catch(e){
      switch(e.response.status){
        case 400: return {message:"state must be Finished, Unfinished or All"};
        default: return {message:"unknown exception"};
      }
    }
  }
}
