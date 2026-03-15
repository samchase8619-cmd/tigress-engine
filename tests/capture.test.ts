import { describe, it, expect } from "vitest";
import { detectStructuredBlocks } from "../src/parser/detectStructuredBlocks.js";

describe("capture", () => {
  it("detects save blocks", () => {
    const ids = detectStructuredBlocks("Example SAVE_FILE_114 text");
    expect(ids).toContain("SAVE_FILE_114");
  });
});