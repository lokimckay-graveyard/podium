export default function log(...args) {
  console.log("[INFO]", Date.now(), ...args);
}

export function warn(...args) {
  console.warn("[WARN]", Date.now(), ...args);
}

export function error(...args) {
  console.error("[ERROR]", Date.now(), ...args);
}

export function debug(...args) {
  console.log("[DEBUG]", Date.now(), ...args);
}
