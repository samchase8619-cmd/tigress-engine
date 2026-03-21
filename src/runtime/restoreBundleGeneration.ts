import { readJsonFile } from "../storage/readJsonFile.js";
import { loadGraph } from "../graph/loadGraph.js";
import { ArtifactRecord } from "../types/artifact.js";

interface ArtifactRegistryFile { artifacts: ArtifactRecord[]; }

const PATHS = {
  systemImage: "data/system/system_image.json",
  artifacts: "data/registries/artifact_registry.json",
  saveStack: "data/registries/save_stack_registry.json",
  projects: "data/registries/project_registry.json",
  sessions: "data/registries/session_registry.json",
};

export async function restoreBundleGeneration() {
  const [systemImage, artifactRegistry, saveStack, projects, sessions, graph] = await Promise.all([
    readJsonFile<unknown>(PATHS.systemImage),
    readJsonFile<ArtifactRegistryFile>(PATHS.artifacts),
    readJsonFile<unknown>(PATHS.saveStack),
    readJsonFile<unknown>(PATHS.projects),
    readJsonFile<unknown>(PATHS.sessions),
    loadGraph(),
  ]);

  const artifactContents = await Promise.all(
    artifactRegistry.artifacts.map(async (rec) => {
      try {
        return { ...rec, content: await readJsonFile<unknown>(rec.path) };
      } catch {
        return { ...rec, content: null };
      }
    })
  );

  return {
    status: "restore_bundle_ready",
    bundle: { system_image: systemImage, save_stack: saveStack, projects, sessions, graph, artifacts: artifactContents },
  };
}