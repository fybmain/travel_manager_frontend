import { observable } from "mobx";
import { UserInfo, LoginRequest } from "../Models";
import { UserApi } from '../api/UserApi';

class UserInfoStore {
  @observable public whenAutoLogin = true;
  @observable public isLogin: boolean = false;
  @observable public userInfo: UserInfo = {
    id: "undefined",
    email: "undefined",
    name: "undefined",
    workId: "undefined",
    telephone: "undefined",
    departmentId: 0,
    role: 0,
  };

  constructor() {
    this.tryAutoLogin().then(() => { this.whenAutoLogin = false; });
  }

  setLogin(userInfo: UserInfo) {
    this.userInfo = userInfo;
    this.isLogin = true;
  }
  setNotLogin() {
    this.isLogin = false;
    this.userInfo = {
      id: "undefined",
      email: "undefined",
      name: "undefined",
      workId: "undefined",
      telephone: "undefined",
      departmentId: 0,
      role: 0,
    };
  }

  public tryAutoLogin = async () => {
    if (localStorage.getItem('Travel-Manager-User-Token') === null) {
      this.setNotLogin();
    } else {
      let result;
      try {
        result = await UserApi.autoLogin();
      } catch (e) {
        this.setNotLogin();
        throw e;
      }
      if (result.message === "ok") {
        const token = result.token as string;
        const userInfo = result.userInfo as UserInfo;
        localStorage.setItem('Travel-Manager-User-Token', token);
        this.setLogin(userInfo);
      } else {
        this.setNotLogin();
      }
    }
  }

  async login(loginRequest: LoginRequest): Promise<string> {
    const result = await UserApi.login(loginRequest);
    if (result.message === "ok") {
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
