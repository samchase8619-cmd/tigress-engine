export type SystemLayerName = "KERNEL" | "RUNTIME" | "GRAPH" | "RESEARCH";

export interface SystemImage {
  system: {
    name: string;
    class: string;
    base_version: string;
    current_version: string;
    status: string;
    operator: string;
    core_principle: string;
  };
  mode: string;
  roles: string[];
  response_style: string[];
  boot_sequence: string[];
  execution_rules: Record<string, unknown>;
  system_layers: Array<{ name: SystemLayerName; purpose: string[] }>;
  projects: string[];
  engines: string[];
  libraries: string[];
  artifact_types: string[];
  graph_relation_types: string[];
  runtime_services: string[];
}