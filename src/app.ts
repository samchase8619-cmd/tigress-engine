import { ensureDirectories } from "./storage/ensureDirectories.js";
import { bootRuntime } from "./boot/bootRuntime.js";

async function main() {
  await ensureDirectories();
  const runtime = await bootRuntime();
  console.log("TigressOS booted");
  console.log(JSON.stringify(runtime, null, 2));
}

main().catch((error) => {
  console.error("Boot failure");
  console.error(error);
  process.exit(1);
});