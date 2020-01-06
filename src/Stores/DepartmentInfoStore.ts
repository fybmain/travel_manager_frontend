import { observable } from "mobx";
import { DepartmentInfo } from "../Models";
import { DepartmentApi } from "../api/DepartmentApi";

class DepartmentInfoStore {
  @observable public fetched: boolean = false;
  @observable public departmentList: DepartmentInfo[] = [];

  private promise: Promise<string>|undefined;

  public getDepartmentName(id: number): string {
    if(this.fetched){
      const obj = this.departmentList.find(
        (value) => (value.id === id)
      );
      if(obj===undefined){
        return "";
      }else{
        return obj.name;
      }
    }else{
      this.refreshData();
      return "";
    }
  }

  public async refreshData() {
    if(this.promise===undefined){
      this.fetched = false;
      this.promise = this.fetchData();
    }

    await this.promise;
    this.promise = undefined;
    this.fetched = true;
  }

  private async fetchData() {
    const result = await DepartmentApi.getDepartmentList();
    if(result.message==="ok"){
      this.departmentList = result.items;
    }
    return result.message;
  }
}

export default new DepartmentInfoStore();
