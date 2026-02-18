/**
 * Get the correct asset path for GitHub Pages deployment
 * @param path - The path relative to the public folder (e.g., '/media/ica/image.jpg')
 * @returns The full path with base URL
 */
export function getAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Remove trailing slash from base if present
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}
