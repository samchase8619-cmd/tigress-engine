export interface ConversationRecord {
  id: string;
  thread: string;
  timestamp: string;
  prompt: string;
  response: string;
  tags?: string[];
  artifacts_detected: string[];
}