import { readFile } from "node:fs/promises";
import { RiverthorNode } from "../types/node.js";

// RT_NODE_### | Domain | System Type | Thought | I:x L:y | Lock: description | Mechanism | tag1, tag2
const NODE_REGEX = /^(RT_NODE_\d+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*I:(\d+)\s+L:(\d+)\s*\|\s*Lock:\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*(.+)$/;

export async function parseRiverthorn(logPath: string): Promise<RiverthorNode[]> {
  const raw = await readFile(logPath, "utf-8");
  const nodes: RiverthorNode[] = [];

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(NODE_REGEX);
    if (!match) continue;

    const [, id, domain, system_type, thought, iStr, lStr, lock_point, mechanism, tagsRaw] = match;

    nodes.push({
      id: id.trim(),
      domain: domain.trim(),
      system_type: system_type.trim(),
      thought: thought.trim(),
      I: parseInt(iStr, 10),
      L: parseInt(lStr, 10),
      lock_point: lock_point.trim(),
      mechanism: mechanism.trim(),
      tags: tagsRaw.split(",").map((t) => t.trim()).filter(Boolean),
    });
  }

  return nodes;
}
