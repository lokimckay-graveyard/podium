import { resultsTests } from "../common";
import { getEvents } from "../../../server/results/smashgg";

const { acrossSmashGGPages } = resultsTests;

describe("smashgg", () => {
  test(acrossSmashGGPages.name, async () => {
    const { events, players } = acrossSmashGGPages.payload;
    const response = await getEvents({
      url: events[0],
      players,
    });

    expect(response[0].players).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Blender" }),
        expect.objectContaining({ name: "Monarch" }),
      ])
    );
  });
});
