import { readJsonFile } from "../storage/readJsonFile.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";

interface ProjectEntry { id: string; name: string; type: string; }
interface ProjectRegistryFile { projects: ProjectEntry[]; }

const PATH = "data/registries/project_registry.json";

export async function updateProjectRegistry(entry: ProjectEntry): Promise<void> {
  const registry = await readJsonFile<ProjectRegistryFile>(PATH);
  const exists = registry.projects.some((p) => p.id === entry.id);
  if (!exists) registry.projects.push(entry);
  await writeJsonFile(PATH, registry);
}