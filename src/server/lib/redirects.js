import fetcher from "../../api/fetcher";

export const followRedirect = async (url) => {
  const isUrl = url.includes("http");
  if (!isUrl) return url;
  const response = await fetcher(url);
  return response.url || url;
};
