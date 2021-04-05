export const helpMessage = ":blue_book:  https://smashpodium.vercel.app/help";

export default async function helpInteraction() {
  return { status: 200, body: { type: 4, data: { content: helpMessage } } };
}
