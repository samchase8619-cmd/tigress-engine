import { readJsonFile } from "../storage/readJsonFile.js";
import { SystemImage } from "../types/system.js";

export async function loadSystemImage(): Promise<SystemImage> {
  return readJsonFile<SystemImage>("data/system/system_image.json");
}