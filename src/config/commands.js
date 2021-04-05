export const results = {
  name: "results",
  description: "Retrieve results of a smash tournament for a given player list",
  options: [
    {
      name: "players",
      description:
        "Player or crew tags to fetch results for (comma delimited, case sensitive). E.g. Loki, BaM",
      type: 3,
      required: true,
    },
    {
      name: "event",
      description: "Smash.gg tournament or event URL to examine for results",
      type: 3,
      required: true,
    },
    {
      name: "showmissing",
      description:
        "Include missing players in output? [True|False] (case sensitive)",
      type: 5,
      required: false,
    },
  ],
};

export const help = {
  name: "help",
  description: "Displays Podium help message",
};
