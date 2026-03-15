import { loadSystemImage } from "./loadSystemImage.js";
import { loadGraph } from "../graph/loadGraph.js";

export async function bootRuntime() {
  const systemImage = await loadSystemImage();
  const graph = await loadGraph();
  return { systemImage, graph, status: "booted" };
}