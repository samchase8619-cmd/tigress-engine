import { readJsonFile } from "../storage/readJsonFile.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";
import { loadGraph } from "../graph/loadGraph.js";

const PATHS = {
  artifacts: "data/registries/artifact_registry.json",
  saveStack: "data/registries/save_stack_registry.json",
  projects: "data/registries/project_registry.json",
  sessions: "data/registries/session_registry.json",
  conversations: "data/registries/conversation_registry.json",
};

export async function snapshotExport(): Promise<{ status: string; path: string }> {
  const [artifacts, saveStack, projects, sessions, conversations, graph] = await Promise.all([
    readJsonFile<unknown>(PATHS.artifacts),
    readJsonFile<unknown>(PATHS.saveStack),
    readJsonFile<unknown>(PATHS.projects),
    readJsonFile<unknown>(PATHS.sessions),
    readJsonFile<unknown>(PATHS.conversations),
    loadGraph(),
  ]);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const snapshotPath = `data/snapshots/snapshot_${timestamp}.json`;

  await writeJsonFile(snapshotPath, {
    exported_at: new Date().toISOString(),
    registries: { artifacts, saveStack, projects, sessions, conversations },
    graph: { nodes: graph.nodes.nodes, relations: graph.relations.relations },
  });

  return { status: "snapshot_exported", path: snapshotPath };
}