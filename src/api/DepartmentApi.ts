import axios from '../axios';
import { DepartmentInfo } from '../Models';

export class DepartmentApi {
  static async getDepartmentList(): Promise<
    { message: "ok", items: DepartmentInfo[] }
    |{ message: "network error" }
    |{ message: "unknown error" }
  >{
    let result;
    try{
      result = await axios.get("api/department/all");
    }catch(e){
      if(e.response){
        return { message: "unknown error" };
      }else{
        return { message: "network error" };
      }
    }
    if(result.data.code===0){
      return {
        message: "ok",
        items: (result.data.data as any[]).map(
          (value): DepartmentInfo => ({
            id: value.id,
            name: value.name,
            managerId: value.managerId,
          })
        ),
      };
    }else{
      return { message: "unknown error"};
    }
  }
}
