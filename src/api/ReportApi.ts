import axios from '../axios';
import { ApplyBaseInfo, CreateReimbursementRequest, ReimbursementApplyDetail, Payment } from '../Models';
import { payBudgetDiffInfo } from '../Models/Report';

export class ReportApi {
  static async getPersonalPayment(request: { time: string }): Promise<{ message: string, items?: Payment }> {
    try {
      const result = await axios.get("api/statistics/payment_percent_diagram/me", { params: request });
      return {
        message: "ok",
        items: {
          food: Number(result.data.data.food),
          hotel: Number(result.data.data.hotel),
          other: Number(result.data.data.other),
          vehicle: Number(result.data.data.vehicle),
        }
      }
    } catch (e) {
      if (!e.response) return { message: "network error" };
      switch (e.response.status) {
        case 400: return { message: "日期字符格式错误，正确格式：yyyy-mm" };
        default: return { message: "unknown exception" };
      }
    }
  }

  static async getPayBudgetDiff(request: { departmentId: number, endTime: string, startTime: string }):
    Promise<{ message: string, items?: payBudgetDiffInfo }> {
    try {
      const result = await axios.post("api/statistics/pay_budget_diff_diagram", request );
      return {
        message: "ok",
        items: result.data.data as payBudgetDiffInfo,
      }
    } catch (e) {
      if (!e.response) return { message: "network error" };
      switch (e.response.status) {
        case 403: return { message: "没有请求权限" };
        case 404: return { message: `找不到对应用户或部门` };
        case 500: return { message: `不处理` };
        default: return { message: "unknown exception" };
      }
    }
  }

  static async getDepartmentPercentile(request: { startTime: string, endTime:string }): Promise<{ message: string, items?: {cost:number,departmentName:string}[] }> {
    try {
      const result = await axios.get("api/statistics/departmentcost_diagram", { params: request });
      return {
        message: "ok",
        items: result.data.data,
      }
    } catch (e) {
      if (!e.response) return { message: "network error" };
      switch (e.response.status) {
        case 400: return { message: "日期字符格式错误，正确格式：yyyy-mm" };
        default: return { message: "unknown exception" };
      }
    }
  }
}