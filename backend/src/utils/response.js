export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = null
) => {
  const response = {
    success,
    message,
    ...(data && { data }),
  };

  return res.status(statusCode).json(response);
};

export const sendSuccess = (res, message, data = null, statusCode = 200) => {
  return sendResponse(res, statusCode, true, message, data);
};

export const sendError = (res, message, statusCode = 400, data = null) => {
  return sendResponse(res, statusCode, false, message, data);
};
