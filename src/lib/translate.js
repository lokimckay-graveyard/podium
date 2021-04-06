import { capitalize, startCase } from "lodash";

// SmashGG tournament or event slug to a pretty name
export function slugToPrettyName(slug) {
  return startCase(slug);
}

// Integer to ordinal string
export const intToOrdinal = (number) => {
  return `${number.toString()}${getSuffix(number)}`;
};

const isInt = (value) => {
  return (
    typeof value === "number" && isFinite(value) && Math.floor(value) === value
  );
};

const getSuffix = (number) => {
  if (!isInt) return;
  const digits = Math.abs(number).toString().split("").reverse();

  return digits.length > 1 && digits[1] == 1
    ? "th"
    : digits[0] == 1
    ? "st"
    : digits[0] == 2
    ? "nd"
    : digits[0] == 3
    ? "rd"
    : "th";
};

// Placement number to emoji string
export const placementToEmoji = (placement) => {
  const emoji =
    placement === 1
      ? ":first_place:"
      : placement === 2
      ? ":second_place:"
      : placement === 3
      ? ":third_place:"
      : "";
  return emoji ? `${emoji} ` : "";
};

// URL source to pretty label string
export const sourceToLabel = (source) => {
  return source === "ausmash"
    ? "AuSmash"
    : source === "smashgg"
    ? "SmashGG"
    : "Unknown";
};
