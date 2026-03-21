import { GraphNode, GraphRelationTuple } from "../types/graph.js";

export interface RelatedNode {
  node: GraphNode;
  relation: string;
  from: string;
}

export interface LinkedPair {
  from: GraphNode;
  relation: string;
  to: GraphNode;
}

export function queryByType(nodes: GraphNode[], type: string): GraphNode[] {
  return nodes.filter((n) => n.type === type);
}

export function queryByDomain(nodes: GraphNode[], domain: string): GraphNode[] {
  return nodes.filter((n) => n.domain === domain);
}

export function findRelated(
  nodeId: string,
  nodes: GraphNode[],
  relations: GraphRelationTuple[]
): RelatedNode[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const results: RelatedNode[] = [];

  for (const [from, relation, to] of relations) {
    if (from === nodeId && nodeMap.has(to)) {
      results.push({ node: nodeMap.get(to)!, relation, from });
    } else if (to === nodeId && nodeMap.has(from)) {
      results.push({ node: nodeMap.get(from)!, relation, from });
    }
  }

  return results;
}

export function findByRelationType(
  relationType: string,
  nodes: GraphNode[],
  relations: GraphRelationTuple[]
): LinkedPair[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const results: LinkedPair[] = [];

  for (const [from, relation, to] of relations) {
    if (relation === relationType) {
      const fromNode = nodeMap.get(from);
      const toNode = nodeMap.get(to);
      if (fromNode && toNode) results.push({ from: fromNode, relation, to: toNode });
    }
  }

  return results;
}
