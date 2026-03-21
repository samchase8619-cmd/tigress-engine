import { describe, it, expect } from "vitest";
import { queryByType, queryByDomain, findRelated, findByRelationType } from "../src/graph/queryGraph.js";
import { GraphNode, GraphRelationTuple } from "../src/types/graph.js";

const nodes: GraphNode[] = [
  { id: "NodeA", type: "CHARACTER_FILE", domain: "Riverthorn" },
  { id: "NodeB", type: "LOCATION_FILE", domain: "Riverthorn" },
  { id: "NodeC", type: "KNOWLEDGE_OBJECT", domain: "Research" },
  { id: "NodeD", type: "CHARACTER_FILE", domain: "Research" },
];

const relations: GraphRelationTuple[] = [
  ["NodeA", "leads_to", "NodeB"],
  ["NodeB", "supports", "NodeC"],
  ["NodeA", "conflicts_with", "NodeD"],
];

describe("queryByType", () => {
  it("returns nodes matching type", () => {
    const result = queryByType(nodes, "CHARACTER_FILE");
    expect(result.map((n) => n.id)).toEqual(["NodeA", "NodeD"]);
  });

  it("returns empty for unknown type", () => {
    expect(queryByType(nodes, "UNKNOWN")).toHaveLength(0);
  });
});

describe("queryByDomain", () => {
  it("returns nodes in the given domain", () => {
    const result = queryByDomain(nodes, "Riverthorn");
    expect(result.map((n) => n.id)).toEqual(["NodeA", "NodeB"]);
  });
});

describe("findRelated", () => {
  it("finds outgoing relations from a node", () => {
    const result = findRelated("NodeA", nodes, relations);
    const ids = result.map((r) => r.node.id);
    expect(ids).toContain("NodeB");
    expect(ids).toContain("NodeD");
  });

  it("finds incoming relations to a node", () => {
    const result = findRelated("NodeB", nodes, relations);
    const ids = result.map((r) => r.node.id);
    expect(ids).toContain("NodeA");
    expect(ids).toContain("NodeC");
  });

  it("returns empty for a node with no relations", () => {
    expect(findRelated("NodeC", nodes, [["NodeA", "leads_to", "NodeB"]])).toHaveLength(0);
  });
});

describe("findByRelationType", () => {
  it("returns all pairs for a given relation type", () => {
    const result = findByRelationType("leads_to", nodes, relations);
    expect(result).toHaveLength(1);
    expect(result[0].from.id).toBe("NodeA");
    expect(result[0].to.id).toBe("NodeB");
  });

  it("returns empty for unknown relation type", () => {
    expect(findByRelationType("destroys", nodes, relations)).toHaveLength(0);
  });
});
