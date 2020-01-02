import { observable } from "mobx";
import { UserInfo } from "../Models/AllModels";


export class MainStore{
  @observable public userInfo:UserInfo;
  @observable public token:string;


  constructor(){
    this.userInfo={
      id: "undefine",
      email: "undefine",
      name: "undefine",
      workId: "undefine",
      telephone: "undefine",
      department: "undefine",
    }
    this.token="";
  }

  public init=()=>{
    console.log("init store");
    this.userInfo={
      id: "undefine",
      email: "undefine",
      name: "undefine",
      workId: "undefine",
      telephone: "undefine",
      department: "undefine",
    }
    this.token="";
  }
}