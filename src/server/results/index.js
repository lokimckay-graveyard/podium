import { uniqBy } from "lodash";
import { isPopulatedArray } from "../../lib/array";
import { debug as logDebug } from "../lib/logger";
import { getEvents as smashgg } from "./smashgg";

const defaultFetcher = (players) => (event) => smashgg({ ...event, players });

// Generates queries, executes queries, combines responses and filters out excluded players
export const retrieveResults = async ({ reqId, players, events }) => {
  const sources = new Set();
  const eventList = parseEventUrls({ events, sources });
  const smashggQueries = eventList
    .filter(bySource("smashgg"))
    .map(defaultFetcher(players));
  const unknownReqs = eventList
    .filter(bySource("unknown"))
    .map(defaultFetcher(players));

  const queries = [...smashggQueries, ...unknownReqs];
  logDebug("/results", reqId, `${queries.length} queries in flight`);
  const responses = await Promise.all(queries);
  logDebug("/results", reqId, "Responses received: ", responses);
  const isError = (response) => !!response[0]?.message || !!response.message;
  const errors = responses.filter((response) => isError(response));
  const results = responses.filter((response) => !isError(response));
  const hasResults = isPopulatedArray(results);
  const uniqEvents = hasResults && uniqBy(results.flat(), "id");
  const targetPlayersOnly = hasResults
    ? uniqEvents.map(excludeOtherPlayers(players))
    : [];

  return { results: targetPlayersOnly, errors };
};

function parseEventUrls({ events, sources }) {
  return events.map((url) => {
    const source = determineSource(url);
    sources.add(source);
    return { source, url };
  });
}

function excludeOtherPlayers(playerWhitelist) {
  return (event) => {
    const { players: playerList } = event;
    if (!playerList) return event;
    const remainingPlayers = new Set(playerWhitelist);
    const foundPlayers = playerList.filter((player) => {
      const { tag, name, crew } = player;
      const tagMatch = playerWhitelist.includes(tag);
      const nameMatch = playerWhitelist.includes(name);
      const crewMatch = playerWhitelist.includes(crew);
      if (tagMatch) remainingPlayers.delete(tag);
      if (nameMatch) remainingPlayers.delete(name);
      if (crewMatch) remainingPlayers.delete(crew);
      const isMatch = tagMatch || nameMatch || crewMatch;
      return isMatch;
    });
    const missingPlayers = Array.from(remainingPlayers).map((player) => player);
    return {
      ...event,
      players: foundPlayers,
      missing: missingPlayers,
    };
  };
}

export const determineSource = (url) => {
  return url.match(/\/\/ausmash.com.au/)
    ? "ausmash"
    : url.match(/\/\/smash.gg/)
    ? "smashgg"
    : "unknown";
};

const bySource = (source) => (url) => url?.source === source;
