export interface RegistryEntry {
  id: string;
  [key: string]: unknown;
}

export interface Registry<T extends RegistryEntry> {
  entries: T[];
}