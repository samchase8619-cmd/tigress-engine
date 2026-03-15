export function conversationId(date = new Date()): string {
  const iso = date.toISOString().replace(/[:.]/g, "-");
  return `conv_${iso}`;
}