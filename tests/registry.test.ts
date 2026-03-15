import { describe, it, expect } from "vitest";
import { readJsonFile } from "../src/storage/readJsonFile.js";

describe("registry", () => {
  it("loads artifact registry", async () => {
    const registry = await readJsonFile<{ artifacts: unknown[] }>("data/registries/artifact_registry.json");
    expect(Array.isArray(registry.artifacts)).toBe(true);
  });
});
