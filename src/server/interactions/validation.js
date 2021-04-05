import { verifyKey } from "discord-interactions";
import { DISCORD_SIG_ED, DISCORD_SIG_TS } from "../../config/headers";
import { isMockCall } from "../index";
import { debug as logDebug } from "../lib/logger";

export const useRawBody = (req) => {
  return new Promise((resolve, reject) => {
    try {
      const body = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", () => {
        resolve(Buffer.concat(body));
      });
    } catch (error) {
      logDebug("[useRawBody]", error);
      reject(error);
    }
  });
};

export const validateInteractionReq = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rawBody = await useRawBody(req);
      req.body = JSON.parse(rawBody.toString());

      if (isMockCall(req.headers)) return resolve();

      const isVerified = verifyKey(
        rawBody,
        req.headers?.[DISCORD_SIG_ED],
        req.headers?.[DISCORD_SIG_TS],
        process.env.DISCORD_BOT_PUBLIC_KEY
      );

      if (!isVerified)
        reject({
          status: 401,
          message: "Unauthorized",
        });

      const isValid = typeof req.body?.data !== undefined;
      if (!isValid)
        reject({
          status: 400,
          message: "Bad request",
        });

      resolve();
    } catch (error) {
      logDebug("[validateInteractionReq]", error);
      reject({ status: 500, message: "Internal server error" });
    }
  });
};
