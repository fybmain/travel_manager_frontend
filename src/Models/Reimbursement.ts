export interface CreateReimbursementRequest {
  payment: Payment,
  pictureIds: number[],
  travelApplyId: number
}

export interface ReimbursementApplyDetail {
  applicant: string,
  budget: Payment,
  payment: Payment,
  travelApplyId:number,
  pictureURLs:string,
  status: number,
}

export interface Payment {
  food: number,
  hotel: number,
  other: number,
  vehicle: number,
}
