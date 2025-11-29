export const NODE_HANDLES_SELECTED_STYLE_CLASSNAME = "node-handles-selected";

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
