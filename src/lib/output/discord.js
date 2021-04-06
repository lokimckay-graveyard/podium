import { isPopulatedArray, sortByField } from "../array";
import { groupEventsByTournament } from "./util";
import { nl, nl2 } from "./util";
import { intToOrdinal, placementToEmoji, slugToPrettyName } from "../translate";

const noResultsMessage = `No results found :sob:`;

export const resultsToOutput = (results, showMissing) => {
  if (!isPopulatedArray(results)) return noResultsMessage;

  const tournaments = groupEventsByTournament(results);
  return Object.entries(tournaments)
    .map(([_tournament, _events]) => {
      const tournament = slugToPrettyName(_tournament);
      const events = eventsToMessage(_events, showMissing);
      const hasEvents = events && events.trim() !== "";
      return hasEvents
        ? `:trophy: __**${tournament}**__${nl2}${events}`
        : noResultsMessage;
    })
    .join(nl2);
};

const eventsToMessage = (events, showMissing) => {
  return events.map(eventToMessage(showMissing)).filter(Boolean).join(nl2);
};

const eventToMessage = (showMissing) => (event) => {
  const { name, players: _players, missing: _missing, link } = event;
  const isValidEvent =
    isPopulatedArray(_players) || (isPopulatedArray(_missing) && showMissing);

  const players = playersToMessage(_players);
  const missing = showMissing ? missingToMessage(_missing) : "";

  return isValidEvent
    ? `:sparkles: __\`${name}\`__${nl}${link}${nl2}${players}${missing}`
    : null;
};

const playersToMessage = (players) => {
  return players.sort(sortByField("placement")).map(playerToMessage).join(nl);
};

const playerToMessage = (player) => {
  const { tag, placement } = player;
  const emoji = placementToEmoji(placement);
  const spacedEmoji = emoji ? ` ${emoji}` : "";
  return `${intToOrdinal(placement)} - ${tag}${spacedEmoji}`;
};

const missingToMessage = (missing) => {
  return isPopulatedArray(missing)
    ? `${nl}~~\`${missing.join(", ")} (missing)\`~~`
    : "";
};
