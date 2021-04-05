import help from "./help";
import results from "./results";

const commands = {
  help,
  results,
  unknown: async (data) =>
    getResponse({
      status: 400,
      content: `Unknown command ${data?.name}`,
    }),
};

export default async function handleInteraction({
  headers,
  body: { id, token, type, data },
}) {
  if (type === 1) return getResponse({ type: 1 }); // ping -> pong
  const response = await (commands[data?.name] || commands.unknown)({
    id,
    token,
    data,
    headers,
  });
  return response;
}

// All interactions return this kind of response to API handler
export const getResponse = ({ status = 200, type = 4, content }) => ({
  status,
  body: {
    type,
    data: content ? { content } : undefined,
  },
});
