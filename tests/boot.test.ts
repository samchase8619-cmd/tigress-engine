import { describe, it, expect } from "vitest";
import { loadSystemImage } from "../src/boot/loadSystemImage.js";

describe("boot", () => {
  it("loads system image", async () => {
    const system = await loadSystemImage();
    expect(system.system.name).toBe("TigressOS");
  });
});