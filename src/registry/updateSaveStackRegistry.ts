import { readJsonFile } from "../storage/readJsonFile.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";
import { SaveStackRegistry } from "../types/saveStack.js";

const PATH = "data/registries/save_stack_registry.json";

function nextSaveId(current: string): string {
  const n = Number(current.replace("SAVE_FILE_", ""));
  return `SAVE_FILE_${n + 1}`;
}

export async function updateSaveStackRegistry(newHighest: string): Promise<void> {
  const registry = await readJsonFile<SaveStackRegistry>(PATH);
  registry.current_runtime_highest = newHighest;
  registry.next_runtime_save = nextSaveId(newHighest);
  await writeJsonFile(PATH, registry);
}