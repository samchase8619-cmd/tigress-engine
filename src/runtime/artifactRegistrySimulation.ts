import { readJsonFile } from "../storage/readJsonFile.js";
import { ArtifactRecord } from "../types/artifact.js";

interface ArtifactRegistryFile { artifacts: ArtifactRecord[]; }

const PATH = "data/registries/artifact_registry.json";

export async function artifactRegistrySimulation() {
  const registry = await readJsonFile<ArtifactRegistryFile>(PATH);
  return {
    status: "artifact_registry_ready",
    count: registry.artifacts.length,
    ids: registry.artifacts.map((a) => a.id),
  };
}