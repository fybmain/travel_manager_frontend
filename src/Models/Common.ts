export interface BaseResponse {
  code: number,
  data: any,
  message: string
}

export function renderDate(text: Date): string {
  return `${text.getFullYear()}年${text.getMonth()+1}月${text.getDate()}日`;
}
