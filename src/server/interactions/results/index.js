import { determineSource } from "../../results";
import { createInteractionResponse } from "../../results/discord";
import { getLoadingMessage } from "./messaging";
import { getResponse } from "../index";
import { getResultsFAF } from "../../../api";
import { isMockCall } from "../../index";
import { maxPlayers } from "../../../config/limits";
import sleep from "../../../lib/sleep";

export default async function resultsInteraction({ id, token, data, headers }) {
  return new Promise(async (resolve, reject) => {
    try {
      const { playerList, eventList, sources, showMissing } = reshapeOptions(
        data?.options
      );
      const isValid = isValidInput({ playerList, eventList });
      if (isValid !== true) return resolve(isValid);

      const loadingMessage = getLoadingMessage({ playerList, sources });
      const response = getResponse({ type: 5, content: loadingMessage });
      const mocking = isMockCall(headers);

      if (!mocking) {
        await createInteractionResponse({
          id,
          token,
          body: response.body,
        });

        getResultsFAF({
          id,
          token,
          players: playerList,
          events: eventList,
          showMissing,
          headers,
        }); // Make a new request to /results endpoint

        await sleep(process.env.FAF_SLEEP || 100);
      }

      return resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

function reshapeOptions(options) {
  if (!options) return {};
  const players = options.find((option) => option.name === "players")?.value;
  const events = options.find((option) => option.name === "event")?.value;
  const showMissing = options.find((option) => option.name === "showmissing")
    ?.value;
  if (!players || !events) throw "No players and/or event found";

  const sources = new Set();
  const playerList = players.split(",").map((player) => player.trim());
  const eventList = events.split(",").map((url) => {
    const source = determineSource(url);
    sources.add(source);
    return url.trim();
  });

  return {
    playerList,
    eventList,
    sources: Array.from(sources),
    showMissing,
  };
}

function isValidInput({ playerList, eventList }) {
  const tooManyEvents = eventList?.length !== 1;
  const tooManyPlayers = playerList.length > maxPlayers;

  if (tooManyEvents)
    return getResponse({ content: ":x: Please provide only one event" });
  if (tooManyPlayers)
    return getResponse({
      content: `:x: Please provide a maximum of ${maxPlayers} players`,
    });
  return true;
}
