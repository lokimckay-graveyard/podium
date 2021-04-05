import Cors from "cors";
import handleInteraction from "../../server/interactions";
import initMiddleware from "../../server/lib/middleware";
import { validateInteractionReq } from "../../server/interactions/validation";
import log, { error as logError } from "../../server/lib/logger";
import { sendErrorResponse, sendSuccessResponse } from "../../server";

const cors = initMiddleware(Cors());

export default async (req, res) => {
  try {
    await cors(req, res); // Enable cors so that discord can hit this endpoint
    await validateInteractionReq(req); // Discord validation
    log("/interactions", req.body?.id, "IN FLIGHT");
    const { status, body } = await handleInteraction({
      body: req.body,
      headers: req.headers,
    });
    sendSuccessResponse({ status, body }, res);
  } catch (error) {
    logError("/interactions", req.body?.id, error);
    sendErrorResponse(error, res);
  } finally {
    log("/interactions", req.body?.id, "COMPLETE");
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
