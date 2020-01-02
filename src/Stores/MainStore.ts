import { observable } from "mobx";

export class MainStore{
  @observable public breadcrumb:string[] = [];
}
