const sendResponse = ({ status, body }, res) => {
  if (body) res.status(status).json(body);
  if (!body) res.status(status).end();
};

export const sendSuccessResponse = (data, res) => {
  const { status, body } = data;

  sendResponse({ status, body }, res);
};

export const sendErrorResponse = (error, res) => {
  const { status, body } = getErrorResponse(error);
  sendResponse({ status, body }, res);
};

const getErrorResponse = (error) => {
  const { status = 500, message } = error;
  return { status, body: { errors: [{ message }] } };
};

export const isMockCall = (reqHeaders = {}) => {
  const {
    PODIUM_ENV: env,
    PODIUM_TEST_HEADER: header,
    PODIUM_TEST_SECRET: secret,
  } = process.env;
  return env === "local" && reqHeaders[header] === secret;
};
