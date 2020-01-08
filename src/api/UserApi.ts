import axios from '../axios';
import { RegisterRequest, LoginRequest, UserInfo, UpdateUserInfoRequest } from '../Models';

export class UserApi {
  static async register(request: RegisterRequest): Promise<{ message:string }>{
    try{
      await axios.post("api/auth/register", request);
      return { message:"ok" };
    }catch(e){
      if(e.response){
        switch(e.response.status){
          case 400: return { message: "workId 已存在" };
          default: return { message: "unknown error" };
        }
      }else{
        return { message: "network error" };
      }
    }
  }

  static async login(request: LoginRequest): Promise<{ userInfo?:UserInfo, token?:string, message:string }> {
    try{
      const result = await axios.post("api/auth/token", request);
      return {
        userInfo: result.data.data.userInfo,
        token: result.data.data.token,
        message: "ok",
      }
    }catch(e){
      if(e.response){
        switch(e.response.status){
          case 403: return { message:"username or password incorrect" };
          default: return { message:"unknown error" };
        }
      }else{
        return { message: "network error" };
      }
    }
  }

  static async autoLogin(): Promise<{ userInfo?:UserInfo, token?:string, message:string }>{
    try{
      const result = await axios.get("api/auth/token");
      return {
        userInfo: result.data.data.userInfo,
        token: result.data.data.token,
        message: "ok",
      }
    }catch(e){
      if(e.response){
        switch(e.response.status){
          case 401: return { message:"not a valid token" };
          default: return { message:"unknown error" };
        }
      }else{
        return { message: "network error" };
      }
    }
  }

  static async forgetPassword(workId: string, email: string) {
    let result;
    try{
      result = await axios.post("api/auth/forgetpassword", { email, workId });
    }catch(e){
      if(e.response){
        switch(e.response.status){
          case 400: return { message: "information incorrect" };
          case 404: return { message: "work id does not exist" };
          default: return { message: "unknown error" };
        }
      }else{
        return { message: "network error" };
      }
    }
    if(result.data.code===0){
      return { message: "ok" };
    }else{
      return { message: "unknown error" };
    }
  }

  static async resetPassword(token: string, newPassword: string) {
    let result;
    try{
      result = await axios.post("api/auth/resetpassword", { newPassword, token });
    }catch(e){
      if(e.response){
        switch(e.response.status){
          case 403: return { message: "reset password token outdated" };
          default: return { message: "unknown error" };
        }
      }else{
        return { message: "network error" };
      }
    }
    if(result.data.code===0){
      return { message: "ok" };
    }else{
      return { message: "unknown error" };
    }
  }

  static async updateUserInfo(request: UpdateUserInfoRequest) {
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
