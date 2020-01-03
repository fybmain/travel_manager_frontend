import axios from '../axios';
import { ApplyBaseInfo, CreateReimbursementRequest } from '../Models/AllModels';

export class ReimbursementApi {
  static async createReimbursementApply(request:CreateReimbursementRequest): Promise<{message:string}>{
    try{
      await axios.post("api/payment/application",request);
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
      return {
        items:result.data.data.items,
        total:result.data.data.total,
        message:"ok"
      }
    }catch(e){
      switch(e.response.status){
        default: return {message:"unknown exception"};
      }
    }
  }

  static async getMyReimbursementApplyList(request:{page:number,size:number,state:string}): Promise<{items?:ApplyBaseInfo[],total?:number,message:string}>{
    try{
      const result= await axios.get("api/payment/applications/me",{params:request});
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
}
