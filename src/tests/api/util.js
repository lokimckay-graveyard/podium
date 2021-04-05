import { isPopulatedArray } from "../../lib/array";

export const payloadToDiscordInteractionPayload = ({
  command = "results",
  payload,
}) => {
  const { players, events, showMissing } = payload;
  return {
    data: {
      name: command,
      options: [
        isPopulatedArray(players) && {
          name: "players",
          type: 3,
          value: players.join(", "),
        },
        isPopulatedArray(events) && {
          name: "event",
          type: 3,
          value: events.join(", "),
        },
        showMissing && {
          name: "showmissing",
          type: 5,
          value: showMissing,
        },
      ].filter(Boolean),
    },
  };
};
