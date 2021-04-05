import _fetcher from "../../../api/fetcher";

const fetcher = (url, options) => {
  return _fetcher(`${process.env.DISCORD_API_ENDPOINT}${url}`, options);
};

export default fetcher;
