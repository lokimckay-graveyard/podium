import { flatten } from "lodash";

export const s2d = (string) => (string ? string.split("\n") : null);
export const d2s = (data) => (data ? data.join("\n") : "");
export const splitCommas = (data) =>
  data ? flatten(data.map((items) => items.split(","))) : data;
