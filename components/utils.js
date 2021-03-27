export const getParsedColors = colorsStr => {
  return [
    colorsStr.slice(0, 6),
    colorsStr.slice(6, 12),
    colorsStr.slice(12, 18),
    colorsStr.slice(18, 24),
  ].map(c => `#${c}`)
}
