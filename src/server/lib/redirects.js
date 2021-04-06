import fetcher from "../../api/fetcher";

export const followRedirect = async (url) => {
  const response = await fetcher(url);
  console.log(response.url);
  return response.url || url;
};
