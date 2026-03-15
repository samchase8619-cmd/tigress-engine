export interface ExtractedArtifact {
  id: string;
  raw_text: string;
}

export function extractArtifacts(response: string): ExtractedArtifact[] {
  const ids = response.match(/SAVE_FILE_\d+/g) ?? [];
  return [...new Set(ids)].map((id) => ({ id, raw_text: response }));
}