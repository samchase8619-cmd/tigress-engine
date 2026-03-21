import { readJsonFile } from "../storage/readJsonFile.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";
import { RiverthorNode, NodeStore } from "../types/node.js";

const PATH = "data/nodes.json";

export interface SyncResult {
  pushed: number;
  skipped: number;
  total: number;
  errors: string[];
}

export async function syncNodeRegistry(incoming: RiverthorNode[]): Promise<SyncResult> {
  const store = await readJsonFile<NodeStore>(PATH);
  const existingIds = new Set(store.nodes.map((n) => n.id));

  const errors: string[] = [];
  let pushed = 0;
  let skipped = 0;

  for (const node of incoming) {
    if (existingIds.has(node.id)) {
      skipped++;
    } else {
      store.nodes.push(node);
      existingIds.add(node.id);
      pushed++;
    }
  }

  try {
    await writeJsonFile(PATH, store);
  } catch (err) {
    errors.push(`Write failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  return { pushed, skipped, total: store.nodes.length, errors };
}
