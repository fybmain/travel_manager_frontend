import { observable } from "mobx";
import { UserInfo } from "../Models/AllModels";


export class MainStore{
  @observable public userInfo:UserInfo={};

  constructor(){
    this.userInfo={
      email: "825823497@qq.com",
      name: "武玥彤",
      telephone: "17371253919",
      workId: "6"
    }
  }
}