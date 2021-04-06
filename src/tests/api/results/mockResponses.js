const fns253SumorbitPlayers = [
  {
    name: "BaM | Leshy",
    crew: "BaM",
    tag: "Leshy",
    placement: 3,
  },
  {
    name: "BaM | Swate",
    crew: "BaM",
    tag: "Swate",
    placement: 2,
  },
];

const fns253SinglesPlayers = [
  {
    name: "Loki",
    tag: "Loki",
    placement: 13,
  },
  {
    name: "BaM | Ricky Clean",
    crew: "BaM",
    tag: "Ricky Clean",
    placement: 17,
  },
  {
    name: "BaM | jungleo",
    crew: "BaM",
    tag: "jungleo",
    placement: 17,
  },
  {
    name: "BaM | Leshy",
    crew: "BaM",
    tag: "Leshy",
    placement: 5,
  },
  {
    name: "BaM | squidfist",
    crew: "BaM",
    tag: "squidfist",
    placement: 33,
  },
  {
    name: "BaM | Jix",
    crew: "BaM",
    tag: "Jix",
    placement: 2,
  },
  {
    name: "BaM | Swate",
    crew: "BaM",
    tag: "Swate",
    placement: 33,
  },
  {
    name: "BaM | Python",
    crew: "BaM",
    tag: "Python",
    placement: 7,
  },
];

const fns253Sumorbit = ({
  players = fns253SumorbitPlayers,
  errors = [],
  missing = ["Loki"],
} = {}) => ({
  id: 561023,
  name: "Sumorbit Singles",
  tournament: "friday-night-smash-253",
  tournamentLink: "https://smash.gg/tournament/friday-night-smash-253",
  link:
    "https://smash.gg/tournament/friday-night-smash-253/event/sumorbit-singles",
  slug: "tournament/friday-night-smash-253/event/sumorbit-singles",
  players,
  errors,
  missing,
});

const fns253Singles = ({
  players = fns253SinglesPlayers,
  errors = [],
  missing = [],
} = {}) => ({
  id: 561022,
  name: "Smash Ultimate Singles",
  tournament: "friday-night-smash-253",
  tournamentLink: "https://smash.gg/tournament/friday-night-smash-253",
  link:
    "https://smash.gg/tournament/friday-night-smash-253/event/smash-ultimate-singles",
  slug: "tournament/friday-night-smash-253/event/smash-ultimate-singles",
  players,
  errors,
  missing,
});

export const tournamentSlug = {
  results: [fns253Singles(), fns253Sumorbit()],
  errors: [],
};

export const fullTournamentLink = {
  results: [fns253Singles(), fns253Sumorbit()],
  errors: [],
};

export const fullEventLink = {
  results: [fns253Singles()],
  errors: [],
};

export const noPlayers = {
  results: [
    fns253Singles({ players: [], missing: ["!!!"] }),
    fns253Sumorbit({ players: [], missing: ["!!!"] }),
  ],
  errors: [],
};

export const noEvents = {
  results: [],
  errors: [
    {
      message: "No events returned by SmashGG for URL: `!!!`",
    },
  ],
};

export const badRequest = {
  results: [],
  errors: [
    {
      message: "Bad request",
    },
  ],
};

export const showMissing = {
  results: [
    fns253Singles({ missing: ["missing"] }),
    fns253Sumorbit({ missing: ["missing"] }),
  ],
  errors: [],
};

export const acrossSmashGGPages = {
  results: [
    {
      id: 563497,
      name: "Ultimate Singles",
      tournament: "get-clipped-11-presented-by-metaview",
      tournamentLink:
        "https://smash.gg/tournament/get-clipped-11-presented-by-metaview",
      link:
        "https://smash.gg/tournament/get-clipped-11-presented-by-metaview/event/ultimate-singles",
      slug:
        "tournament/get-clipped-11-presented-by-metaview/event/ultimate-singles",
      players: [
        {
          name: "Blender",
          tag: "Blender",
          placement: 129,
        },
        {
          name: "Monarch",
          tag: "Monarch",
          placement: 193,
        },
      ],
      errors: [],
      missing: [],
    },
  ],
  errors: [],
};

export const duplicatePlayers = {
  results: [
    fns253Singles({
      players: [
        {
          name: "Loki",
          tag: "Loki",
          placement: 13,
        },
      ],
    }),
    fns253Sumorbit({ players: [], missing: ["Loki"] }),
  ],
  errors: [],
};
