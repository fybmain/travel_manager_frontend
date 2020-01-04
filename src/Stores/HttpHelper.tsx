import { RegisterRequest, LoginRequest, UserInfo } from '../Models/AllModels';
import axios from '../axios';

export class HttpHelper{

  public static async register(request:RegisterRequest):Promise<{message:string}>{
    try{
      const result= await axios.post("api/auth/register",request);
      return {message:"ok"};
    }catch(e){
      switch(e.response.status){
        case 400: return {message:"work id exists"};
        default: return {message:"unknown exception"};
      }
    }
  }

  public static async login(request:LoginRequest):Promise<{userInfo?:UserInfo,token?:string,message:string}>{
    try{
      const result= await axios.post("api/auth/token",request);
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

  public static async autoLogin():Promise<{userInfo?:UserInfo,token?:string,message:string}>{
    try{
      const result= await axios.get("api/auth/token");
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
