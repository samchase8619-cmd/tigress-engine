export interface RiverthorNode {
  id: string;
  domain: string;
  system_type: string;
  thought: string;
  I: number;
  L: number;
  lock_point: string;
  mechanism: string;
  tags: string[];
}

export interface NodeStore {
  nodes: RiverthorNode[];
}
