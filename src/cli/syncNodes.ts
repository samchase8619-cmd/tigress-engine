import { parseRiverthorn } from "../parser/parseRiverthorn.js";
import { syncNodeRegistry } from "../registry/updateNodeRegistry.js";

const LOG_PATH = "RIVERTHORN_LOG.md";

async function main(): Promise<void> {
  console.log("\nRiverthorn Node Sync");
  console.log(`Reading: ${LOG_PATH}\n`);

  const nodes = await parseRiverthorn(LOG_PATH);

  if (nodes.length === 0) {
    console.warn("No RT_NODE entries found in log. Exiting.");
    process.exit(0);
  }

  console.log(`Parsed ${nodes.length} node(s) from log.`);

  const result = await syncNodeRegistry(nodes);

  console.log(`\n--- Sync Report ---`);
  console.log(`Pushed:  ${result.pushed}`);
  console.log(`Skipped: ${result.skipped} (already in store)`);
  console.log(`Total:   ${result.total}`);

  if (result.errors.length > 0) {
    console.error(`\nErrors (${result.errors.length}):`);
    for (const err of result.errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log(`\nStore: data/nodes.json`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
