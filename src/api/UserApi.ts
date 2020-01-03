import axios from '../axios';
import { RegisterRequest, LoginRequest, UserInfo } from '../Models/AllModels';

export class UserApi {
  static async register(request:RegisterRequest): Promise<{message:string}>{
    try{
      const result= await axios.post("api/auth/register",request);
      console.log(result);
      return {message:"ok"};
    }catch(e){
      switch(e.response.status){
        case 400: return {message:"workId 已存在"};
        default: return {message:"unknown exception"};
      }
    }
  }

  static async login(request:LoginRequest): Promise<{userInfo?:UserInfo,token?:string,message:string}> {
    try{
      const result= await axios.post("api/auth/token",request);
      console.log(result);
      return {
        userInfo:result.data.data.userInfo,
        token:result.data.data.token,
        message:"ok"
      }
    }catch(e){
      switch(e.response.status){
        case 401: return {message:"username or password incorrect"};
        default: return {message:"unknown exception"};
      }
    }
  }

  static async autoLogin(): Promise<{userInfo?:UserInfo,token?:string,message:string}>{
    try{
      const result= await axios.get("api/auth/token");
      console.log(result);
      return {
        userInfo:result.data.data.userInfo,
        token:result.data.data.token,
        message:"ok"
      }
    }catch(e){
      switch(e.response.status){
        case 401: return {message:"not a valid token"};
        default: return {message:"unknown exception"};
      }
    }
  }
}
