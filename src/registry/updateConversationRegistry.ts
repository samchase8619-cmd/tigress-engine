import { readJsonFile } from "../storage/readJsonFile.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";

const PATH = "data/registries/conversation_registry.json";

export async function updateConversationRegistry(id: string, thread: string, path: string): Promise<void> {
  const registry = await readJsonFile<{ conversations: Array<Record<string, string>> }>(PATH);
  registry.conversations.push({ id, thread, path });
  await writeJsonFile(PATH, registry);
}