import { ConversationRecord } from "../types/conversation.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";

export async function saveConversation(record: ConversationRecord): Promise<void> {
  const path = `data/conversations/${record.id}.json`;
  await writeJsonFile(path, record);
}