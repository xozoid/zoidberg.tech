/**
 * Get theme colors.
 *
 * @param name Name of color to get.
 * @returns Hex string of color.
 */
export function getThemeColor(name: string): string {
  const style = getComputedStyle(document.body);

  return style.getPropertyValue(`--color-${name}`).trim();
}
