import { describe, it, expect } from "vitest";
import { extractArtifacts } from "../src/parser/extractArtifacts.js";

describe("extractArtifacts", () => {
  it("returns empty array for text with no save files", () => {
    expect(extractArtifacts("no markers here")).toHaveLength(0);
  });

  it("extracts id and raw_text for a simple marker", () => {
    const result = extractArtifacts("preamble SAVE_FILE_101 some content here");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("SAVE_FILE_101");
    expect(result[0].raw_text).toBe("some content here");
  });

  it("deduplicates repeated markers", () => {
    const result = extractArtifacts("SAVE_FILE_101 text SAVE_FILE_101 more");
    expect(result).toHaveLength(1);
  });

  it("extracts multiple distinct artifacts", () => {
    const result = extractArtifacts("SAVE_FILE_101 first block SAVE_FILE_102 second block");
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("SAVE_FILE_101");
    expect(result[1].id).toBe("SAVE_FILE_102");
  });

  it("parses title and project from embedded JSON", () => {
    const json = JSON.stringify({ title: "My Artifact", artifact_type: "SAVE_FILE", project: "TigressOS" });
    const result = extractArtifacts(`SAVE_FILE_105 ${json}`);
    expect(result[0].title).toBe("My Artifact");
    expect(result[0].artifact_type).toBe("SAVE_FILE");
    expect(result[0].project).toBe("TigressOS");
  });

  it("handles malformed JSON gracefully", () => {
    const result = extractArtifacts("SAVE_FILE_106 { bad json {{{}");
    expect(result[0].id).toBe("SAVE_FILE_106");
    expect(result[0].title).toBeUndefined();
  });
});
