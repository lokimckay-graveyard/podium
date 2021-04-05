import LRU from "lru-cache";

const maxAge = 1000 * 60 * 60; // 1 hour (ms)
const cache = new LRU({ maxAge });

export default cache;
export const getCacheKey = (obj) => {
  return JSON.stringify(obj);
};
