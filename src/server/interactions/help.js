const helpMessage = `
Podium Help
-----------

Hello there :heart:
`;

export default async function ({ body, sendResponse, updateCache }) {
  const responseBody = { type: 4, data: { content: helpMessage } };
  sendResponse({ status: 200, body: responseBody });
  updateCache({ status: 200, body: responseBody });
}
