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
      departmentId: 0,
      role: 0,
    }
  }

  public init=()=>{
    console.log("init store");
    this.userInfo={
      id: "undefine",
      email: "undefine",
      name: "undefine",
      workId: "undefine",
      telephone: "undefine",
      departmentId: 0,
      role: 0,
    }
  }
}