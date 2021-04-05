import { resultsToOutput as web } from "./web";
import { resultsToOutput as discord } from "./discord";
import { resultsToOutput as plainText } from "./plainText";
import { outputTargets } from "../keys";
import { warn as logWarning } from "../../server/lib/logger";

const targets = {
  [outputTargets.WEB]: web,
  [outputTargets.DISCORD]: discord,
  [outputTargets.PLAIN_TEXT]: plainText,
};

export const resultsToOutput = ({ target, results, showMissing }) => {
  const foundTarget = targets[target];
  if (!foundTarget) logWarning("Invalid output target: ", target);
  return foundTarget ? foundTarget(results, showMissing) : null;
};
