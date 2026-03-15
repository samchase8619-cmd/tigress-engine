export function detectStructuredBlocks(response: string): string[] {
  const matches = response.match(/SAVE_FILE_\d+/g) ?? [];
  return [...new Set(matches)];
}