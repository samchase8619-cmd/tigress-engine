import { readJsonFile } from "../storage/readJsonFile.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";

interface SessionEntry {
  id: string;
  status: string;
  sources: number;
  knowledge_objects: number;
  graph_relations: number;
  reasoning_traces: number;
  research_documents: number;
}
interface SessionRegistryFile { sessions: SessionEntry[]; }

const PATH = "data/registries/session_registry.json";

export async function updateSessionRegistry(entry: Partial<SessionEntry> & { id: string }): Promise<void> {
  const registry = await readJsonFile<SessionRegistryFile>(PATH);
  const idx = registry.sessions.findIndex((s) => s.id === entry.id);
  const defaults: SessionEntry = {
    id: entry.id,
    status: "active",
    sources: 0,
    knowledge_objects: 0,
    graph_relations: 0,
    reasoning_traces: 0,
    research_documents: 0,
  };
  if (idx >= 0) {
    registry.sessions[idx] = { ...registry.sessions[idx], ...entry };
  } else {
    registry.sessions.push({ ...defaults, ...entry });
  }
  await writeJsonFile(PATH, registry);
}