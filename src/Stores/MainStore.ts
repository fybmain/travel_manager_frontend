import { observable } from "mobx";
import { UserInfo } from "../Models/AllModels";


export class MainStore{
  @observable public breadcrumb:string[] = [];

  constructor(){
  }
}
