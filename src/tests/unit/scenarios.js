import { resultsTests } from "../api/common";

/* 
  Unnecessary to test these scenarios here
    - tooManyPlayers (/interactions endpoint will handle validation upfront)
    - tooManyEvents (/interactions endpoint will handle validation upfront)
    - acrossSmashGGPages (response should already have both players as mock input, no value from testing)
    - duplicatePlayers (response should already be unique-ified)
*/

const {
  tournamentSlug,
  showMissing,
  fullTournamentLink,
  fullEventLink,
  invalidEvent,
  invalidPlayer,
  invalidPlayerAndEvent,
} = resultsTests;

const expectFNS253Success = (output) => {
  expect(output).toMatch("Smash Ultimate Singles");
  expect(output).toMatch("Sumorbit Singles");
  expect(output).toMatch("Loki");
};

const scenarios = [
  [
    tournamentSlug.name,
    tournamentSlug.mockResponse,
    {
      discord: (output) => {
        expectFNS253Success(output);
        expect(output).not.toMatch("(missing)");
      },
    },
  ],
  [
    showMissing.name,
    showMissing.mockResponse,
    {
      discord: (output) => {
        expectFNS253Success(output);
        expect(output).toMatch("(missing)");
      },
    },
    { showMissing: true },
  ],
  [
    fullTournamentLink.name,
    fullTournamentLink.mockResponse,
    {
      discord: (output) => {
        expectFNS253Success(output);
      },
    },
  ],
  [
    fullEventLink.name,
    fullEventLink.mockResponse,
    {
      discord: (output) => {
        expect(output).toMatch("Smash Ultimate Singles");
        expect(output).not.toMatch("Sumorbit Singles");
        expect(output).toMatch("Loki");
      },
    },
  ],
  [
    invalidEvent.name,
    invalidEvent.mockResponse,
    {
      discord: (output) => {
        expect(output).toMatch("No results found");
      },
    },
  ],
  [
    invalidPlayer.name,
    invalidPlayer.mockResponse,
    {
      discord: (output) => {
        expect(output).toMatch("No results found");
      },
    },
  ],
  [
    invalidPlayerAndEvent.name,
    invalidPlayerAndEvent.mockResponse,
    {
      discord: (output) => {
        expect(output).toMatch("No results found");
      },
    },
  ],
];

export default scenarios;
