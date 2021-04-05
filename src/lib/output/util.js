export const nl = `
`;
export const nl2 = `${nl}${nl}`;

export const groupEventsByTournament = (events) => {
  return events.reduce((acc, event) => {
    if (!event.tournament) return acc;
    const existingEntry = acc[event.tournament];
    if (typeof existingEntry === "undefined") acc[event.tournament] = [];
    acc[event.tournament].push(event);
    return acc;
  }, {});
};
