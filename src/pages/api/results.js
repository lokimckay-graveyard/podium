import { nanoid } from "nanoid";
import { isPopulatedArray } from "../../lib/array";
import { retrieveResults } from "../../server/results";
import cache, { getCacheKey } from "../../server/lib/cache";
import { sendErrorResponse, sendSuccessResponse } from "../../server";
import log, {
  debug as logDebug,
  error as logError,
} from "../../server/lib/logger";
import { updateInteraction } from "../../server/results/discord";
import { maxPlayers } from "../../config/limits";

const validateRequest = ({ players, events }) => {
  return (
    isPopulatedArray(players) &&
    players.length <= maxPlayers &&
    isPopulatedArray(events) &&
    events.length === 1
  );
};

const cachedResponseAvailable = (key, res, reqId) => {
  const { status, body } = cache.get(key) || {};
  const valid = status && body;
  if (valid) sendSuccessResponse({ status, body }, res);
  logDebug("/results", reqId, `[CACHE MATCH]`, !!valid);
  return valid;
};

export default async (req, res) => {
  const reqId = req.body?.id || nanoid();
  try {
    log("/results", reqId, "IN FLIGHT");

    if (!req.body || !validateRequest(req.body)) {
      sendErrorResponse({ status: 400, message: "Bad request" }, res);
      return;
    }

    const cacheKey = getCacheKey(req.body);
    const { id, token, players, events, showMissing } = req.body;

    if (!cachedResponseAvailable(cacheKey, res, reqId)) {
      const { results, errors } = await retrieveResults({
        reqId,
        players,
        events,
        showMissing,
      });
      const status = 200;
      const body = { results, errors };
      cache.set(cacheKey, { status, body });

      const isHangingDiscordRequest = id && token;
      if (isHangingDiscordRequest) {
        await updateInteraction({ token, results, showMissing });
      }

      sendSuccessResponse({ status, body }, res);
      return;
    }
  } catch (error) {
    logError("/results", reqId, error);
    sendErrorResponse({ status: 500, message: "Internal server error" });
  } finally {
    log("/results", reqId, "COMPLETE");
  }
};
