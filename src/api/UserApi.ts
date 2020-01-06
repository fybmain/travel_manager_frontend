import axios from '../axios';
import { RegisterRequest, LoginRequest, UserInfo, UpdateUserInfoRequest } from '../Models';

export class UserApi {
  static async register(request:RegisterRequest): Promise<{message:string}>{
    try{
      const result= await axios.post("api/auth/register",request);
      console.log(result);
      return {message:"ok"};
    }catch(e){
      if(e.response){
        switch(e.response.status){
          case 400: return {message:"workId 已存在"};
          default: return {message:"unknown error"};
        }
      }else{
        return { message: "network error" };
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
      if(e.response){
        switch(e.response.status){
          case 401: return {message:"username or password incorrect"};
          default: return {message:"unknown error"};
        }
      }else{
        return { message: "network error" };
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
      if(e.response){
        switch(e.response.status){
          case 401: return {message:"not a valid token"};
          default: return {message:"unknown error"};
        }
      }else{
        return { message: "network error" };
      }
    }
  }

  static async updateUserInfo(request: UpdateUserInfoRequest): Promise<{message:string}>{
    let result;
    try{
      result = await axios.put("api/auth/user", request);
    }catch(e){
      if(e.response){
        switch(e.response.status){
          default: return { message:"unknown error" };
        }
      }else{
        return { message: "network error" };
      }
    }
    if(result.data.code===0){
      return { message:"ok" };
    }else{
      return { message: "network error" };
    }
  }
}
