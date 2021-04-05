import { nl2 } from "../../../lib/output/util";
import { resultsToOutput } from "../../../lib/output";
import { sourceToLabel } from "../../../lib/translate";
import { isPopulatedArray } from "../../../lib/array";
import { outputTargets } from "../../../lib/keys";

export const getOutputMessage = (data) => {
  const { results, showMissing } = data;
  const resultsMessage = resultsToOutput({
    target: outputTargets.DISCORD,
    results,
    showMissing,
  });
  return isPopulatedArray(results)
    ? resultsMessage
    : `${getConfirmationMessage(data)}${nl2}${resultsMessage}`;
};

export const getLoadingMessage = (data) =>
  `${getConfirmationMessage(data)}${nl2}:hourglass: Loading...`;

export const getErrorMessage = (data, error) =>
  `${getConfirmationMessage(data)}${nl2}:interrobang: Error: ${error}`;

const getConfirmationMessage = ({ playerList, sources }) => {
  const multipleSources = sources.length > 0;
  const eventPlural = multipleSources ? "event URLs" : " event URL";

  const knownSources = sources.filter((source) => source !== "unknown");
  const allKnownSources = knownSources.length === sources.length;
  const someKnownSources = !allKnownSources && knownSources.length > 0;
  const allUnknownSources = !allKnownSources && !someKnownSources;
  const displaySources =
    !allUnknownSources &&
    knownSources.map((source) => sourceToLabel(source)).join(", ");
  const defaultDisplay = sourceToLabel(process.env.DEFAULT_SOURCE);

  const playerCount = playerList.length;

  const message = (sources) => `:cowboy: [Players]: ${playerCount}
:robot: [Sources]: ${sources}`;
  const someKnownMessage = `:warning: Some event URLs were not recognized, defaulting to ${defaultDisplay}${nl2}${message(
    defaultDisplay
  )}`;
  const unknownMessage = `:warning: Provided ${eventPlural} not recognized, defaulting to ${defaultDisplay}${nl2}${message(
    defaultDisplay
  )}`;

  return allKnownSources
    ? message(displaySources)
    : someKnownSources
    ? someKnownMessage
    : unknownMessage;
};
