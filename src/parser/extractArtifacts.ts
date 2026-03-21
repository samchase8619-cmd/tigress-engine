export interface ExtractedArtifact {
  id: string;
  raw_text: string;
  title?: string;
  artifact_type?: string;
  project?: string;
}

export function extractArtifacts(response: string): ExtractedArtifact[] {
  const pattern = /SAVE_FILE_\d+/g;
  const matches = [...response.matchAll(pattern)];
  const seen = new Set<string>();
  const results: ExtractedArtifact[] = [];

  for (let i = 0; i < matches.length; i++) {
    const id = matches[i][0];
    if (seen.has(id)) continue;
    seen.add(id);

    const startPos = matches[i].index! + id.length;
    const endPos = i + 1 < matches.length ? matches[i + 1].index! : response.length;
    const slice = response.slice(startPos, endPos).trim();

    let title: string | undefined;
    let artifact_type: string | undefined;
    let project: string | undefined;

    const jsonMatch = slice.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        title = parsed.title;
        artifact_type = parsed.artifact_type;
        project = parsed.project;
      } catch {
        // not valid JSON — raw text only
      }
    }

    results.push({ id, raw_text: slice || response, title, artifact_type, project });
  }

  return results;
}