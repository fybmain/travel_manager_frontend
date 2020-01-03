import axios from '../axios';
import { TravelApplyItem, TravelApplyDetail } from '../Models/AllModels';
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
    console.log(result);
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
}
