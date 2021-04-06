import fetcher from "./fetcher";

export const updateInteraction = ({ token, content }) => {
  return editOriginalInteractionResponse({
    token,
    body: { content },
  });
};

export const createInteractionResponse = ({ id, token, body }) => {
  return fetcher(`/interactions/${id}/${token}/callback`, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const editOriginalInteractionResponse = ({ token, body }) => {
  return fetcher(
    `/webhooks/${process.env.DISCORD_APP_ID}/${token}/messages/@original`,
    {
      body: JSON.stringify(body),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
