import fetch from "isomorphic-unfetch";

const fetcher = (url, options, headers, ...rest) => {
  const { origin = "" } = headers ? getAbsoluteUrl(headers) : {};
  return fetch(`${origin}${url}`, options, ...rest);
};

function getAbsoluteUrl(headers) {
  const host = headers
    ? headers["x-forwarded-host"] || headers["host"]
    : window.location.host;
  const containsLocalhost = host.indexOf("localhost") > -1;
  const protocol = containsLocalhost ? "http:" : "https:";
  return {
    protocol,
    host,
    origin: `${protocol}//${host}`,
  };
}

export default fetcher;
