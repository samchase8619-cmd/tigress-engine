import { describe, it, expect } from "vitest";
import { contextLoader } from "../src/runtime/contextLoader.js";

describe("contextLoader", () => {
  it("returns status context_loaded", async () => {
    const ctx = await contextLoader();
    expect(ctx.status).toBe("context_loaded");
  });

  it("returns numeric counts for all registries", async () => {
    const ctx = await contextLoader();
    expect(typeof ctx.artifact_count).toBe("number");
    expect(typeof ctx.project_count).toBe("number");
    expect(typeof ctx.conversation_count).toBe("number");
    expect(typeof ctx.graph_node_count).toBe("number");
    expect(typeof ctx.graph_relation_count).toBe("number");
  });

  it("reports at least one artifact", async () => {
    const ctx = await contextLoader();
    expect(ctx.artifact_count).toBeGreaterThan(0);
  });
});
