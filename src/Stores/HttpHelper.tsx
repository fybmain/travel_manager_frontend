import { RegisterRequest, LoginRequest, UserInfo } from '../Models/AllModels';
import axios from '../axios';

export class HttpHelper{
  public getData(){
      axios.get("/api/test")
      .then(function (response) {
        console.log("/api/test "+response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  public static async register(request:RegisterRequest):Promise<{message:string}>{
    try{
      const result= await axios.post("api/auth/register",request);
      console.log(result);
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
}

/*
Sample:
<Button
                onClick={(e) => {
                  console.log("register");
                  HttpHelper.register({
                    email: "825823497@qq.com",
                    name: "武玥彤",
                    password: "123456",
                    telephone: "17371253919",
                    workId: "6"
                  });}}>
                  测试注册
              </Button>
*/