import { readJsonFile } from "../storage/readJsonFile.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";
import { GraphNodeCollection, GraphNode } from "../types/graph.js";

const PATH = "data/graph/graph_nodes.json";

export async function saveGraphNode(node: GraphNode): Promise<void> {
  const data = await readJsonFile<GraphNodeCollection>(PATH);
  if (!data.nodes.some((n) => n.id === node.id)) data.nodes.push(node);
  await writeJsonFile(PATH, data);
}