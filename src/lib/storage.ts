export const STORAGE_KEY = "meditation-app-storage";

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
