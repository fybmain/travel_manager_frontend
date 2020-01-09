import axios from '../axios';

import { Message } from '../Models';

export class MessageApi {
  static async getMessageList(): Promise<
    { message: "ok", items: Message[] }
    |{ message: "unknown error"|"network error" }
  > {
    let result;
    try{
      result = await axios.get('api/message/all');
    }catch(e){
      if(e.response){
        return { message: "unknown error" };
      }else{
        return { message: "network error" };
      }
    }
    if(result.data.code===0){
      return {
        message: "ok",
        items: (result.data.data.messages as any[]).map(
          (message) => ({
            content: message.message,
          })
        ),
      };
    }else{
      return { message: "unknown error" };
    }
  }
}
