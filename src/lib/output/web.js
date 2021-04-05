import { isPopulatedArray, sortByField } from "../array";
import { groupEventsByTournament } from "./util";
import {
  intToOrdinal,
  slugToPrettyName,
  statusToPrettyStatus,
} from "../translate";
import {
  Event,
  Players,
  Player,
  Tournament,
  Missing,
  NotFound,
} from "../../components/results/web";

export const resultsToOutput = (results, showMissing) => {
  const hasResults = isPopulatedArray(results);
  if (!hasResults) return <NotFound />;

  const tournaments = groupEventsByTournament(results);
  return Object.entries(tournaments).map(([_tournament, _events], index) => {
    const tournament = slugToPrettyName(_tournament);
    const tournamentLink = _events[0].tournamentLink;
    const events = eventsToMessage(_events, showMissing);
    const hasEvents = events && isPopulatedArray(events);
    return hasEvents ? (
      <Tournament key={index} tournament={tournament} link={tournamentLink}>
        {events}
      </Tournament>
    ) : (
      <NotFound />
    );
  });
};

const eventsToMessage = (events, showMissing) => {
  return events.map(eventToMessage(showMissing)).filter(Boolean);
};

const eventToMessage = (showMissing) => (event, index) => {
  const { status, players, missing } = event;
  const isValidEvent =
    isPopulatedArray(players) || (isPopulatedArray(missing) && showMissing);
  return isValidEvent ? (
    <Event key={index} {...{ ...event, status: statusToPrettyStatus(status) }}>
      {showMissing && missingToMessage(missing)}
      {playersToMessage(players)}
    </Event>
  ) : null;
};

const playersToMessage = (players) => {
  return (
    <Players>
      {players.sort(sortByField("placement")).map(playerToMessage)}
    </Players>
  );
};

const playerToMessage = (player, index) => {
  const { tag, placement } = player;
  return <Player key={index} placement={intToOrdinal(placement)} tag={tag} />;
};

const missingToMessage = (missing) => {
  return isPopulatedArray(missing) ? (
    <Missing>{missing.join(", ")}</Missing>
  ) : (
    ""
  );
};
