import { readJsonFile } from "../storage/readJsonFile.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";

const PATHS = {
  artifacts: "data/registries/artifact_registry.json",
  saveStack: "data/registries/save_stack_registry.json",
  projects: "data/registries/project_registry.json",
  sessions: "data/registries/session_registry.json",
  conversations: "data/registries/conversation_registry.json",
  graphNodes: "data/graph/graph_nodes.json",
  graphRelations: "data/graph/graph_relations.json",
};

interface SnapshotFile {
  exported_at: string;
  registries: {
    artifacts?: unknown;
    saveStack?: unknown;
    projects?: unknown;
    sessions?: unknown;
    conversations?: unknown;
  };
  graph?: {
    nodes: unknown[];
    relations: unknown[];
  };
}

export async function restoreFromSnapshot(snapshotPath: string): Promise<{ status: string; restored: string[] }> {
  const snapshot = await readJsonFile<SnapshotFile>(snapshotPath);
  const restored: string[] = [];
  const writes: Promise<void>[] = [];

  const { registries, graph } = snapshot;

  if (registries.artifacts) {
    writes.push(writeJsonFile(PATHS.artifacts, registries.artifacts));
    restored.push("artifact_registry");
  }
  if (registries.saveStack) {
    writes.push(writeJsonFile(PATHS.saveStack, registries.saveStack));
    restored.push("save_stack");
  }
  if (registries.projects) {
    writes.push(writeJsonFile(PATHS.projects, registries.projects));
    restored.push("project_registry");
  }
  if (registries.sessions) {
    writes.push(writeJsonFile(PATHS.sessions, registries.sessions));
    restored.push("session_registry");
  }
  if (registries.conversations) {
    writes.push(writeJsonFile(PATHS.conversations, registries.conversations));
    restored.push("conversation_registry");
  }
  if (graph) {
    writes.push(writeJsonFile(PATHS.graphNodes, { nodes: graph.nodes }));
    writes.push(writeJsonFile(PATHS.graphRelations, { relations: graph.relations }));
    restored.push("graph_nodes", "graph_relations");
  }

  await Promise.all(writes);

  return { status: "restored", restored };
}
