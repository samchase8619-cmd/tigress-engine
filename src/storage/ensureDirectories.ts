import { mkdir } from "node:fs/promises";

const REQUIRED_DIRS = [
  "data/conversations", "data/artifacts", "data/sources", "data/projects",
  "data/graph", "data/registries", "data/system", "data/snapshots"
];

export async function ensureDirectories(): Promise<void> {
  await Promise.all(REQUIRED_DIRS.map((dir) => mkdir(dir, { recursive: true })));
}