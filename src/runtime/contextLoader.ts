import { readJsonFile } from "../storage/readJsonFile.js";
import { loadGraph } from "../graph/loadGraph.js";

const PATHS = {
  artifacts: "data/registries/artifact_registry.json",
  saveStack: "data/registries/save_stack_registry.json",
  projects: "data/registries/project_registry.json",
  sessions: "data/registries/session_registry.json",
  conversations: "data/registries/conversation_registry.json",
};

export async function contextLoader() {
  const [artifacts, saveStack, projects, sessions, conversations, graph] = await Promise.all([
    readJsonFile<{ artifacts: unknown[] }>(PATHS.artifacts),
    readJsonFile<Record<string, string>>(PATHS.saveStack),
    readJsonFile<{ projects: unknown[] }>(PATHS.projects),
    readJsonFile<{ sessions: unknown[] }>(PATHS.sessions),
    readJsonFile<{ conversations: unknown[] }>(PATHS.conversations),
    loadGraph(),
  ]);

  return {
    status: "context_loaded",
    artifact_count: artifacts.artifacts.length,
    save_stack: saveStack,
    project_count: projects.projects.length,
    active_sessions: sessions.sessions.length,
    conversation_count: conversations.conversations.length,
    graph_node_count: graph.nodes.nodes.length,
    graph_relation_count: graph.relations.relations.length,
  };
}