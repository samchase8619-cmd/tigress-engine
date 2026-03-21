/**
 * TigressOS Capture Server
 *
 * Upgrade path:
 * - Current: Express HTTP server, frontend served as static files
 * - Next: Electron wrapper — import startServer() from this file,
 *   call it from electron main process, load index.html via BrowserWindow
 * - The API surface (/api/capture) remains identical in both modes
 */

import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { conversationId } from "../capture/conversationId.js";
import { saveConversation } from "../capture/saveConversation.js";
import { updateConversationRegistry } from "../registry/updateConversationRegistry.js";
import { updateSaveStackRegistry } from "../registry/updateSaveStackRegistry.js";
import { detectStructuredBlocks } from "../parser/detectStructuredBlocks.js";
import { readJsonFile } from "../storage/readJsonFile.js";
import { ensureDirectories } from "../storage/ensureDirectories.js";
import { SaveStackRegistry } from "../types/saveStack.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SAVE_STACK_PATH = "data/registries/save_stack_registry.json";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(join(process.cwd(), "src", "ui", "public")));

app.post("/api/capture", async (req, res) => {
  try {
    const { text, label } = req.body as { text: string; label: string };

    if (!text || !text.trim()) {
      res.status(400).json({ error: "No text provided" });
      return;
    }

    await ensureDirectories();

    const id = conversationId();
    const timestamp = new Date().toISOString();
    const filePath = `data/conversations/${id}.json`;
    const artifactIds = detectStructuredBlocks(text);

    const record = {
      id,
      thread: label || "web-ui",
      timestamp,
      prompt: "",
      response: text,
      artifacts_detected: artifactIds,
    };

    await saveConversation(record);
    await updateConversationRegistry(id, label || "web-ui", filePath);

    const saveStack = await readJsonFile<SaveStackRegistry>(SAVE_STACK_PATH);
    const assignedSaveId = saveStack.next_runtime_save;
    await updateSaveStackRegistry(assignedSaveId);

    const updatedStack = await readJsonFile<SaveStackRegistry>(SAVE_STACK_PATH);

    res.json({
      saved: true,
      filePath,
      assignedSaveId,
      nextSaveId: updatedStack.next_runtime_save,
      artifactsDetected: artifactIds,
    });
  } catch (err) {
    console.error("Capture error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export function startServer(port = 3333): void {
  app.listen(port, () => {
    console.log(`TigressOS Web UI running at http://localhost:${port}`);
  });
}

// Only start when run directly (not imported as a module, e.g. by Electron)
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  startServer();
}
