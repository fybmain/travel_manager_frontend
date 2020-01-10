import axios from '../axios';

import { Message, renderDate } from '../Models';

export class MessageApi {
  static async getMessageList(): Promise<
    { message: "ok", items: Message[] }
    | { message: "unknown error" | "network error" }
  > {
    let result;
    try {
      result = await axios.get('api/message/all');
    } catch (e) {
      if (e.response) {
        return { message: "unknown error" };
      } else {
        return { message: "network error" };
      }
    }
    if (result.data.code === 0) {
      return {
        message: "ok",
        items: (result.data.data.messages as any[]).map(
          (message) => ({
            content: message.message,
          })
        ),
      };
    } else {
      return { message: "unknown error" };
    }
  }


  static async getMessageList2(): Promise<
    { message: "ok", items: Message[] }
    | { message: "unknown error" | "network error" }
  > {
    try {
      const result1 = await axios.get('/api/homepage/applications', { params: { type: "travel" } });
      const result2 = await axios.get('/api/homepage/applications', { params: { type: "payment" } });
      let items1: string[] = result1.data.data.items.map((value: MessageInfo) => {
        return `您在${renderDate(new Date(value.applyTime))}时间提交的编号为${value.applyId}的出差申请正${applyStatus[value.status]}，总金额为${value.money}元.`;
      });
      let items2: string[] = result2.data.data.items.map((value: MessageInfo) => {
        return `您在${renderDate(new Date(value.applyTime))}时间提交的编号为${value.applyId}的报销申请正${applyStatus[value.status]}，总金额为${value.money}元.`;
      });
      items1 = items1.concat(items2);
      console.log(items1)
      return {
        message: "ok",
        items: items1.map((value: string) => {
          return {
            content: value,
          }
        })
      };
    } catch (e) {
      if (e.response) {
        return { message: "unknown error" };
      } else {
        return { message: "network error" };
      }
    }
  }
}

interface MessageInfo {
  applyId: number,
  applyTime: string,
  money: number,
  status: number
}

const applyStatus = ["", "等待部门经理审批", "等待总经理审批"]
