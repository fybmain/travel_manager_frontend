import axios from '../axios';
import { ApplyBaseInfo, CreateReimbursementRequest, ReimbursementApplyDetail } from '../Models';

export class ReimbursementApi {
  static async createReimbursementApply(request: CreateReimbursementRequest): Promise<{ message: string }> {
    try {
      await axios.post("api/payment/application", request);
      return { message: "ok" };
    } catch (e) {
      switch (e.response.status) {
        case 403: return { message: "无权限" };
        case 404: return { message: `未找到ID${request.travelApplyId}对应出差申请` };
        default: return { message: "unknown exception" };
      }
    }
  }

  static async getUnpaidTravelApplyList(request: { page: number, size: number }): Promise<{ items?: ApplyBaseInfo[], total?: number, message: string }> {
    try {
      const result = await axios.get("api/travel/applications/unpaid", { params: request });
      return {
        items: result.data.data.items,
        total: result.data.data.total,
        message: "ok"
      }
    } catch (e) {
      switch (e.response.status) {
        default: return { message: "unknown exception" };
      }
    }
  }

  static async getMyReimbursementApplyList(request: { page: number, size: number, state: string }): Promise<{ items?: ApplyBaseInfo[], total?: number, message: string }> {
    try {
      const result = await axios.get("api/payment/applications/me", { params: request });
      return {
        items: result.data.data.items,
        total: result.data.data.total,
        message: "ok"
      }
    } catch (e) {
      switch (e.response.status) {
        case 400: return { message: "请求参数错误" };
        default: return { message: "unknown exception" };
      }
    }
  }

  static async getReimbursementApplyList(request: { page: number, size: number, state: string, departmentId: number }): Promise<{ items?: ApplyBaseInfo[], total?: number, message: string }> {
    try {
      const result = await axios.get("api/payment/applications", { params: request });
      return {
        items: result.data.data.items,
        total: result.data.data.total,
        message: "ok"
      }
    } catch (e) {
      switch (e.response.status) {
        case 400: return { message: "请求参数错误" };
        case 403: return { message: "无权限" };
        case 404: return { message: "未找到该用户" };
        /* falls through */
        default: return { message: "unknown exception" };
      }
    }
  }

  static async getReimbursementApplyInfo(request: { applyId: number }): Promise<{ items?: ReimbursementApplyDetail, message: string }> {
    try {
      const result = await axios.get("api/payment/application", { params: request });
      return {
        items: result.data.data,
        message: "ok"
      }
    } catch (e) {
      switch (e.response.status) {
        case 403: return { message: "无权限" };
        case 404: {
          switch (e.response.code) {
            case 1001: return { message: "未找到对应的出差申请" };
            case 1002: return { message: "未找到对应的报销申请" };
            case 1003: return { message: "未找到该用户" };
          }
        }
        /* falls through */
        default: return { message: "unknown exception" };
      }
    }
  }

  static async approveReimbursementApply(request: { applyId: number, approved: boolean }): Promise<{ message: string }> {
    try {
      await axios.put("api/payment/approval", request );
      return {
        message: "ok"
      }
    } catch (e) {
      switch (e.response.status) {
        case 403: {
          switch (e.response.code) {
            case 4001: return { message: "该申请已被审批" };
            case 4002: return { message: "无权限" };
          }
        }
        /* falls through */
        default: return { message: "unknown exception" };
      }
    }
  }
}
