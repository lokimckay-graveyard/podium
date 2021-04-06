import { generateArray } from "../../lib/array";
import { maxPlayers } from "../../config/limits";
import * as resultsMockResponses from "./results/mockResponses";

export const resultsTests = {
  tournamentSlug: {
    // /results players: BaM, Loki event: friday-night-smash-253
    name: "events: friday-night-smash-253",
    payload: { players: ["Loki", "BaM"], events: ["friday-night-smash-253"] },
    mockResponse: resultsMockResponses.tournamentSlug,
  },
  tooManyPlayers: {
    // /results players: <Loki * 100> event: friday-night-smash-253
    name: "players: <too many>",
    payload: {
      players: generateArray({
        value: (index) => `Loki-${index}`,
        copies: maxPlayers + 1,
      }),
      events: ["friday-night-smash-253"],
    },
    mockResponse: resultsMockResponses.badRequest,
  },
  tooManyEvents: {
    // /results players: BaM, Loki event: friday-night-smash-253, friday-night-smash-252
    name: "events: friday-night-smash-252, friday-night-smash-253",
    payload: {
      players: ["Loki", "BaM"],
      events: ["friday-night-smash-252", "friday-night-smash-253"],
    },
    mockResponse: resultsMockResponses.badRequest,
  },
  invalidEvent: {
    // /results players: BaM, Loki event: !!!
    name: "events: <bogus>",
    payload: {
      players: ["Loki", "BaM"],
      events: ["!!!"],
    },
    mockResponse: resultsMockResponses.noEvents,
  },
  invalidPlayer: {
    // /results players: !!! event: friday-night-smash-253
    name: "players: <bogus>",
    payload: {
      players: ["!!!"],
      events: ["friday-night-smash-253"],
    },
    mockResponse: resultsMockResponses.noPlayers,
  },
  invalidPlayerAndEvent: {
    // /results players: !!! event: !!!
    name: "players: <bogus> event: <bogus>",
    payload: {
      players: ["!!!"],
      events: ["!!!"],
    },
    mockResponse: resultsMockResponses.noEvents,
  },
  acrossSmashGGPages: {
    // /results players: Blender, Monarch event: get-clipped-11-presented-by-metaview
    name: "players: <first page player> <last page player>",
    payload: {
      players: ["Blender", "Monarch"],
      events: ["get-clipped-11-presented-by-metaview"],
    },
    mockResponse: resultsMockResponses.acrossSmashGGPages,
  },
  fullEventLink: {
    // /results players: BaM, Loki event: https://smash.gg/tournament/friday-night-smash-253/event/smash-ultimate-singles/overview
    name: "events: eventLink",
    payload: {
      players: ["Loki", "BaM"],
      events: [
        "https://smash.gg/tournament/friday-night-smash-253/event/smash-ultimate-singles/overview",
      ],
    },
    mockResponse: resultsMockResponses.fullEventLink,
  },
  fullTournamentLink: {
    // /results players: BaM, Loki event: https://smash.gg/tournament/friday-night-smash-253/events
    name: "events: tournamentLink",
    payload: {
      players: ["Loki", "BaM"],
      events: ["https://smash.gg/tournament/friday-night-smash-253/events"],
    },
    mockResponse: resultsMockResponses.fullTournamentLink,
  },
  showMissing: {
    // /results players: BaM, missing showmissing: True event: friday-night-smash-253
    name: "showMissing: true",
    payload: {
      players: ["BaM", "missing"],
      events: ["friday-night-smash-253"],
      showMissing: true,
    },
    mockResponse: resultsMockResponses.showMissing,
  },
  duplicatePlayers: {
    // /results players: Loki, Loki, Loki event: friday-night-smash-253
    name: "players: Loki, Loki, Loki",
    payload: {
      players: ["Loki", "Loki", "Loki"],
      events: ["friday-night-smash-253"],
    },
    mockResponse: resultsMockResponses.duplicatePlayers,
  },
  redirectUrl: {
    // /results players: BaM event: https://smash.gg/fns
    name: "event: https://smash.gg/fns (redirect)",
    payload: {
      players: ["BaM", "Loki"],
      events: ["https://smash.gg/fns"],
    },
  },
  slugTranslation: {
    // /results players: BaM event: fns
    name: "event: fns",
    payload: {
      players: ["BaM", "Loki"],
      events: ["fns"],
    },
  },
};
