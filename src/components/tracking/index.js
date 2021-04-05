import { isBrowser } from "../../lib/browser";

export default function Tracking() {
  return (
    <script
      async
      defer
      data-website-id="9f36cb39-6668-41e6-b574-ef08200dfb34"
      src="https://sneyed-analytics.vercel.app/umami.js"
    />
  );
}

export const fireEvent = ({ type, value }) => {
  if (!isBrowser()) return;
  console.debug("[EVENT]", type, value);
  window.umami.trackEvent(value, type);
};
