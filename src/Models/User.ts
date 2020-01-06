export interface LoginRequest {
  workId: string,
  password: string
}

export interface RegisterRequest {
  email: string,
  name: string,
  password: string,
  telephone: string,
  workId: string
}

export interface UpdateUserInfoRequest {
  name: string,
  email: string,
  telephone: string,
}

export interface UserInfo {
  id: string,
  workId: string,
  name: string,
  email: string,
  telephone: string,
  departmentId: number,
  role: number,
}
