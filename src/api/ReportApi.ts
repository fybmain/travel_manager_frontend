import axios from '../axios';
import { ApplyBaseInfo, CreateReimbursementRequest, ReimbursementApplyDetail, Payment } from '../Models';

export class ReportApi {
  static async getPersonalPayment(request: { time: string }): Promise<{ message: string, items?: Payment }> {
    try {
      const result = await axios.get("api/statistics/payment_percent_diagram", { params: request });
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
        case 500: return { message: `sql执行错误` };
        default: return { message: "unknown exception" };
      }
    }
  }
}