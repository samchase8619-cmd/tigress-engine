import { readJsonFile } from "../storage/readJsonFile.js";
import { writeJsonFile } from "../storage/writeJsonFile.js";
import { GraphRelationCollection, GraphRelationTuple } from "../types/graph.js";

const PATH = "data/graph/graph_relations.json";

export async function saveGraphRelation(relation: GraphRelationTuple): Promise<void> {
  const data = await readJsonFile<GraphRelationCollection>(PATH);
  const key = JSON.stringify(relation);
  if (!data.relations.some((r) => JSON.stringify(r) === key)) data.relations.push(relation);
  await writeJsonFile(PATH, data);
}