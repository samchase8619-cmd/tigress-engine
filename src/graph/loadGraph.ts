import { readJsonFile } from "../storage/readJsonFile.js";
import { GraphNodeCollection, GraphRelationCollection } from "../types/graph.js";

export async function loadGraph() {
  const nodes = await readJsonFile<GraphNodeCollection>("data/graph/graph_nodes.json");
  const relations = await readJsonFile<GraphRelationCollection>("data/graph/graph_relations.json");
  return { nodes, relations };
}