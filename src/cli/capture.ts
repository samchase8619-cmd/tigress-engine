import { createInterface } from "node:readline";
import { conversationId } from "../capture/conversationId.js";
import { saveConversation } from "../capture/saveConversation.js";
import { updateConversationRegistry } from "../registry/updateConversationRegistry.js";
import { updateSaveStackRegistry } from "../registry/updateSaveStackRegistry.js";
import { detectStructuredBlocks } from "../parser/detectStructuredBlocks.js";
import { readJsonFile } from "../storage/readJsonFile.js";
import { ensureDirectories } from "../storage/ensureDirectories.js";
import { SaveStackRegistry } from "../types/saveStack.js";

const SENTINEL = "---END---";
const SAVE_STACK_PATH = "data/registries/save_stack_registry.json";

async function main(): Promise<void> {
  await ensureDirectories();

  console.log("\nTigressOS Capture CLI");
  console.log("Paste your ChatGPT response below.");
  console.log(`When done, type ${SENTINEL} on its own line and press Enter.\n`);

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const lines: string[] = [];

  await new Promise<void>((resolve) => {
    rl.on("line", (line) => {
      if (line.trim() === SENTINEL) {
        rl.close();
        resolve();
      } else {
        lines.push(line);
      }
    });
    rl.on("close", () => resolve());
  });

  const text = lines.join("\n");

  if (!text.trim()) {
    console.warn("\n⚠️  No input received. Exiting without saving.");
    process.exit(0);
  }

  const id = conversationId();
  const timestamp = new Date().toISOString();
  const filePath = `data/conversations/${id}.json`;
  const artifactIds = detectStructuredBlocks(text);

  const record = {
    id,
    thread: "capture-cli",
    timestamp,
    prompt: "",
    response: text,
    artifacts_detected: artifactIds,
  };

  await saveConversation(record);
  await updateConversationRegistry(id, "capture-cli", filePath);

  const saveStack = await readJsonFile<SaveStackRegistry>(SAVE_STACK_PATH);
  const assignedSaveId = saveStack.next_runtime_save;
  await updateSaveStackRegistry(assignedSaveId);

  const updatedStack = await readJsonFile<SaveStackRegistry>(SAVE_STACK_PATH);

  console.log(`\n✅ Conversation saved: ${filePath}`);
  console.log(`✅ Save ID assigned: ${assignedSaveId}`);
  if (artifactIds.length > 0) {
    console.log(`✅ Artifacts detected: ${artifactIds.join(", ")}`);
  }
  console.log(`✅ Next save will be: ${updatedStack.next_runtime_save}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
