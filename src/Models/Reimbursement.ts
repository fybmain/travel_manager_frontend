export interface CreateReimbursementRequest {
  payment: Payment,
  pictureIds: number[],
  travelApplyId: number
}

export interface ReimbursementApplyDetail {
  applicant: string,
  department: string,
  budget: Payment,
  payment: Payment,
  travelApplyId:number,
  pictureURLs:string,
  status: number,
  comment:string,
}

export interface Payment {
  food: number,
  hotel: number,
  other: number,
  vehicle: number,
}
