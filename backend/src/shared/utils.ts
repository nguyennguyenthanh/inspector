export function escapeHtml(unsafe: string): string {
  return unsafe.replace(/[^\x00-\x7F]/g, " ");
}

export function convertToNumeric(text: string): number | undefined {
  const parts = escapeHtml(text).split(/ |\)/);
  const numericValue = parts[0];

  const regex = /^-?\d*\.?\d*$/;
  const isNumeric = regex.test(numericValue);
  return isNumeric ? Number(numericValue) : undefined;
}
