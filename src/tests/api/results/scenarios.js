import { resultsTests } from "../common";

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
  duplicatePlayers,
  redirectUrl,
} = resultsTests;

const expectNoEventsReturned = (res) => {
  // Expect no results, and expect 'No events returned' error message
  expect(res.body.results).toHaveLength(0);
  expect(res.body).toEqual(
    expect.objectContaining({
      errors: [{ message: expect.stringContaining("No events returned") }],
    })
  );
};

export const expectSuccess = [
  [tournamentSlug.name, tournamentSlug.payload],
  [fullTournamentLink.name, fullTournamentLink.payload],
  [fullEventLink.name, fullEventLink.payload],
  [
    showMissing.name,
    showMissing.payload,
    (res) => {
      // Expect bogus player "missing" only present in missing array
      expect(res.body.results[0]).toEqual(
        expect.objectContaining({
          missing: expect.arrayContaining(["missing"]),
          players: expect.not.arrayContaining(["missing"]),
        })
      );
    },
  ],
  [
    acrossSmashGGPages.name,
    acrossSmashGGPages.payload,
    (res) => {
      // Expect both players to be present in results
      expect(res.body.results[0].players).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Blender",
          }),
          expect.objectContaining({
            name: "Monarch",
          }),
        ])
      );
    },
  ],
  [
    invalidPlayer.name,
    invalidPlayer.payload,
    (res) => {
      // Expect no players, and expect missing
      const flatPlayers = res.body.results.map((event) => event.players).flat();
      const flatMissing = res.body.results.map((event) => event.missing).flat();
      expect(flatPlayers).toHaveLength(0);
      expect(flatMissing).not.toHaveLength(0);
    },
  ],
  [
    duplicatePlayers.name,
    duplicatePlayers.payload,
    (res) => {
      expect(res.body.results[0].players).toHaveLength(1);
    },
  ],
  [redirectUrl.name, redirectUrl.payload],
];

export const expectPartialSuccess = [
  [invalidEvent.name, invalidEvent.payload, expectNoEventsReturned],
  [
    invalidPlayerAndEvent.name,
    invalidPlayerAndEvent.payload,
    expectNoEventsReturned,
  ],
];

export const expectBadRequest = [
  [tooManyEvents.name, tooManyEvents.payload],
  [tooManyPlayers.name, tooManyPlayers.payload],
];
