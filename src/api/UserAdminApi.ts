import axios from '../axios';
import { AdminListUserItem } from '../Models';

export class UserAdminApi {
  static async getUserList(pageSize: number, page: number, approved: boolean): Promise<
    { message: "ok", total: number, items: AdminListUserItem[] }
    |{ message: "network error" }
    |{ message: "unknown error" }
  > {
    let result;
    try{
      result = await axios.get('api/admin/users', {
        params: {
          page,
          size: pageSize,
          enable: approved?"true":"false",
        },
      });
    }catch(e){
      if(e.response){
        return { message: "network error" };
      }else{
        return { message: "unknown error" };
      }
    }
    if(result.data.code===0){
      return {
        message: "ok",
        total: result.data.data.total,
        items: (result.data.data.detailusers as any[]).map(
          (value) => ({
            id: value.id,
            workId: value.workId,
            name: value.name,
            email: value.email,
            telephone: value.telephone,
            departmentId: value.departmentId,
            departmentName: value.departmentName,
            status: value.status,
            role: value.role,
          })
        ),
      };
    }else{
      return { message: "unknown error" };
    }
  }
}
