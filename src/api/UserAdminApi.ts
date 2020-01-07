import axios from '../axios';
import { AdminListUserItem, UserRole } from '../Models';

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
        return { message: "unknown error" };
      }else{
        return { message: "network error" };
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

  static async setUserApprovalStatus(userId: number, approve: boolean) {
    let result;
    try{
      result = await axios.put('api/admin/user/approval', {
        approved: approve,
        userId,
      });
    }catch(e){
      if(e.response){
        switch(e.response.status){
          case 400: return { message: e.response.data.message };
          default: return { message: "unknown error" };
        }
      }else{
        return { message: "network error" };
      }
    }
    if(result.data.code===0){
      return { message: "ok" };
    }else{
      return { message: "unknown error" };
    }
  }

  static async updateUserDepartment(userId: number, departmentId: number) {
    let result;
    try{
      result = await axios.put('api/admin/user/department', {
        departmentId,
        userId,
      });
    }catch(e){
      if(e.response){
        switch(e.response.status){
          default: return { message: "unknown error" };
        }
      }else{
        return { message: "network error" };
      }
    }
    if(result.data.code===0){
      return { message: "ok" };
    }else{
      return { message: "unknown error" };
    }
  }

  static async updateUserRole(userId: number, role: UserRole) {
    let result;
    try{
      result = await axios.put('api/admin/user/role', {
        roleId: role.valueOf(),
        userId,
      });
    }catch(e){
      if(e.response){
        switch(e.response.status){
          case 400: return { message: e.response.data.message };
          default: return { message: "unknown error" };
        }
      }else{
        return { message: "network error" };
      }
    }
    if(result.data.code===0){
      return { message: "ok" };
    }else{
      return { message: "unknown error" };
    }
  }
}
