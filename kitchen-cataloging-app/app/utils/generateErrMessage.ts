const generateErrMessage = ({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) => {
  return {
    statusCode,
    message,
  };
};
export default generateErrMessage;
