import fetcher from "./fetcher";

const getResultsCallArgs = ({ id, token, players, events, headers }) => [
  "/api/results",
  {
    body: JSON.stringify({ id, token, players, events }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },
  headers,
];

export const getResults = async (data) => {
  const response = await fetcher(...getResultsCallArgs(data));
  const results = await response.json();
  return results;
};

export const getResultsFAF = (data) => {
  fetcher(...getResultsCallArgs(data));
};
