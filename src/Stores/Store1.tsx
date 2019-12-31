import axios from 'axios'
import { RegisterRequest, BaseResponse, LoginRequest } from '../Models/AllModels';

export class Store1{
  

  public getData(){
      axios.get("/api/test")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  public static async register(request:RegisterRequest){
    const result= await axios.post("api/auth/register",request);
    console.log(result);
    switch(result.status){
      case 200:
        return {status:true};
      case 400:
        return {status:false,message:"work id exists"};
      default:
        return {status:false};
    }
  }

  public static async login(request:LoginRequest){
    const result= await axios.post("api/auth/token",request);
    console.log(result);
  }
}

/*
Sample:
<Button
                onClick={(e) => {
                  console.log("register");
                  Store1.register({
                    email: "825823497@qq.com",
                    name: "武玥彤",
                    password: "123456",
                    telephone: "17371253919",
                    workId: "6"
                  });}}>
                  测试注册
              </Button>
*/