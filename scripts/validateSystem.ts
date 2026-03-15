import { loadSystemImage } from "../src/boot/loadSystemImage.js";
import { loadGraph } from "../src/graph/loadGraph.js";

async function main() {
  const system = await loadSystemImage();
  const graph = await loadGraph();
  if (!system.system.name) throw new Error("System image invalid");
  if (!Array.isArray(graph.nodes.nodes)) throw new Error("Graph nodes invalid");
  if (!Array.isArray(graph.relations.relations)) throw new Error("Graph relations invalid");
  console.log("System validation passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});