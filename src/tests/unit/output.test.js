import { outputTargets } from "../../lib/keys";
import { resultsToOutput } from "../../lib/output";
import scenarios from "./scenarios";

describe("output generation", () => {
  describe("discord", () => {
    test.concurrent.each(scenarios)(
      "%s",
      (testName, payload, assertions, options) => {
        return new Promise((resolve) => {
          const { showMissing } = options || {};
          const output = resultsToOutput({
            ...payload,
            target: outputTargets.DISCORD,
            showMissing,
          });
          assertions.discord(output);
          resolve(output);
        });
      }
    );
  });
});
