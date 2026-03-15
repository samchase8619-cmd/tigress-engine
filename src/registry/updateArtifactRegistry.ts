import { readJsonFile } from "../storage/readJsonFile.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";
import { ArtifactRecord } from "../types/artifact.js";

interface ArtifactRegistryFile { artifacts: ArtifactRecord[]; }
const PATH = "data/registries/artifact_registry.json";

export async function updateArtifactRegistry(entry: ArtifactRecord): Promise<void> {
  const registry = await readJsonFile<ArtifactRegistryFile>(PATH);
  const exists = registry.artifacts.some((item) => item.id === entry.id);
  if (!exists) registry.artifacts.push(entry);
  await writeJsonFile(PATH, registry);
}