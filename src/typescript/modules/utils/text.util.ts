export function stringToNormalLines(text: string): string[] {
  if (!text) {
    return [text];
  }

  return text
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);
}
