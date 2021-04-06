const sendResponse = ({ status = 500, body }, res) => {
  if (!res) throw "[sendReponse] res not provided";
  if (body) return res.status(status).json(body);
  if (!body) return res.status(status).end();
};

export const sendSuccessResponse = (data, res) => {
  sendResponse(data, res);
};

export const sendErrorResponse = (error, res) => {
  sendResponse(getErrorResponse(error), res);
};

const getErrorResponse = (error) => {
  const { status = 500, message } = error || {};
  return {
    status,
    body: { errors: [{ message: message || "Internal server error" }] },
  };
};

export const isMockCall = (reqHeaders = {}) => {
  const {
    PODIUM_ENV: env,
    PODIUM_TEST_HEADER: header,
    PODIUM_TEST_SECRET: secret,
  } = process.env;
  return env === "local" && reqHeaders[header] === secret;
};

// UP TO: /results players: BaM event: https://smash.gg/fns
// should respond with cannot parse
