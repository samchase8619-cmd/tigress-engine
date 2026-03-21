import { describe, it, expect } from "vitest";
import { snapshotExport } from "../src/runtime/snapshotExport.js";
import { restoreFromSnapshot } from "../src/runtime/restoreFromSnapshot.js";
import { readJsonFile } from "../src/storage/readJsonFile.js";
import { existsSync, unlinkSync } from "node:fs";

describe("snapshotExport", () => {
  it("returns status snapshot_exported and a path", async () => {
    const result = await snapshotExport();
    expect(result.status).toBe("snapshot_exported");
    expect(result.path).toMatch(/^data\/snapshots\/snapshot_/);
  });

  it("writes a file that exists on disk", async () => {
    const result = await snapshotExport();
    expect(existsSync(result.path)).toBe(true);
    unlinkSync(result.path); // clean up
  });
});

describe("restoreFromSnapshot round-trip", () => {
  it("restores registries and graph from a snapshot", async () => {
    const { path } = await snapshotExport();
    const result = await restoreFromSnapshot(path);

    expect(result.status).toBe("restored");
    expect(result.restored).toContain("artifact_registry");
    expect(result.restored).toContain("save_stack");
    expect(result.restored).toContain("graph_nodes");
    expect(result.restored).toContain("graph_relations");

    unlinkSync(path);
  });

  it("restores a valid artifact registry", async () => {
    const { path } = await snapshotExport();
    await restoreFromSnapshot(path);
    const registry = await readJsonFile<{ artifacts: unknown[] }>("data/registries/artifact_registry.json");
    expect(Array.isArray(registry.artifacts)).toBe(true);
    unlinkSync(path);
  });
});
