export interface GraphNode {
  id: string;
  type: string;
  domain: string;
}

export type GraphRelationTuple = [string, string, string];

export interface GraphNodeCollection {
  nodes: GraphNode[];
}

export interface GraphRelationCollection {
  relations: GraphRelationTuple[];
}