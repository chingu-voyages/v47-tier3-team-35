export interface SuccessResult {
  type: "success";
  statusCode: 200;
}
export interface ErrorResult {
  type: "error";
  statusCode: number;
  message: string;
}