import { resultsTests } from "../common";
import { payloadToDiscordInteractionPayload as convert } from "../util";

const {
  tournamentSlug,
  tooManyEvents,
  tooManyPlayers,
  showMissing,
  fullTournamentLink,
  fullEventLink,
  invalidEvent,
  invalidPlayer,
  invalidPlayerAndEvent,
  acrossSmashGGPages,
} = resultsTests;

export const expectLoadingMessage = [
  [tournamentSlug.name, convert({ payload: tournamentSlug.payload })],
  [showMissing.name, convert({ payload: showMissing.payload })],
  [fullTournamentLink.name, convert({ payload: fullTournamentLink.payload })],
  [fullEventLink.name, convert({ payload: fullEventLink.payload })],
  [invalidEvent.name, convert({ payload: invalidEvent.payload })],
  [invalidPlayer.name, convert({ payload: invalidPlayer.payload })],
  [
    invalidPlayerAndEvent.name,
    convert({ payload: invalidPlayerAndEvent.payload }),
  ],
  [acrossSmashGGPages.name, convert({ payload: acrossSmashGGPages.payload })],
];

export const expectValidationError = [
  [
    tooManyEvents.name,
    convert({ payload: tooManyEvents.payload }),
    (res) => {
      expect(res.body.data.content).toMatch("Please provide only one event");
    },
  ],
  [
    tooManyPlayers.name,
    convert({ payload: tooManyPlayers.payload }),
    (res) => {
      expect(res.body.data.content).toMatch(
        "Please provide a maximum of 100 players"
      );
    },
  ],
];
