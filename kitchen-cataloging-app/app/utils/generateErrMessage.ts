export type ErrorMessage = {
  type: "error";
  statusCode: number;
  message: string;
};
const generateErrMessage = ({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}): ErrorMessage => {
  return {
    type: "error",
    statusCode,
    message,
  };
};
export default generateErrMessage;
