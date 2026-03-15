import { ensureDirectories } from "../src/storage/ensureDirectories.js";

async function main() {
  await ensureDirectories();
  console.log("Directories ensured.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});