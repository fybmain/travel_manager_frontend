import { observable } from "mobx";
import { UserInfo } from "../Models/AllModels";


export class MainStore{
  @observable public userInfo:UserInfo;


  constructor(){
    this.userInfo={
      id: "undefine",
      email: "undefine",
      name: "undefine",
      workId: "undefine",
      telephone: "undefine",
      department: "undefine",
    }
  }
}