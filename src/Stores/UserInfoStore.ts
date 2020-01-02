import { observable } from "mobx";
import { UserInfo, LoginRequest } from "../Models/AllModels";
import { HttpHelper } from './HttpHelper';

class UserInfoStore {
  @observable public whenAutoLogin = true;
  @observable public isLogin: boolean = false;
  @observable public userInfo: UserInfo = {
    id: "undefined",
    email: "undefined",
    name: "undefined",
    workId: "undefined",
    telephone: "undefined",
    department: "undefined",
  };

  constructor(){
    this.tryAutoLogin().then(() => {this.whenAutoLogin = false;});
  }

  setLogin(userInfo: UserInfo){
    this.userInfo = userInfo;
    this.isLogin = true;
  }
  setNotLogin(){
    this.isLogin = false;
    this.userInfo = {
      id: "undefined",
      email: "undefined",
      name: "undefined",
      workId: "undefined",
      telephone: "undefined",
      department: "undefined",
    };
  }

  async tryAutoLogin() {
    if(localStorage.getItem('Travel-Manager-User-Token')===null){
      this.setNotLogin();
    }else{
      let result;
      try{
        result = await HttpHelper.autoLogin();
      }catch(e){
        this.setNotLogin();
        throw e;
      }
      if (result.message == "ok") {
        const token = result.token as string;
        const userInfo = result.userInfo as UserInfo;
        localStorage.setItem('Travel-Manager-User-Token', token);
        this.setLogin(userInfo);
      }else{
        this.setNotLogin();
      }
    }
  }

  async login(loginRequest: LoginRequest): Promise<string> {
    const result = await HttpHelper.login(loginRequest);
    if (result.message == "ok") {
      const token = result.token as string;
      const userInfo = result.userInfo as UserInfo;
      localStorage.setItem('Travel-Manager-User-Token', token);
      this.setLogin(userInfo); 
    } else {
      this.setNotLogin();
    }
    return result.message;
  }

  logout() {
    this.setNotLogin();
    localStorage.removeItem('Travel-Manager-User-Token');
  }
}

export default new UserInfoStore();
