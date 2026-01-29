/**
 * Derive calendar quarter from a date string.
 * Uses calendar-year quarters (EF fiscal year is calendar-aligned):
 *   Q1 = Jan-Mar, Q2 = Apr-Jun, Q3 = Jul-Sep, Q4 = Oct-Dec
 * Output format: "YYYY QN" (e.g., "2025 Q1")
 */
export function deriveFiscalQuarter(dateStr: string): string {
  const [year, month] = dateStr.split('-').map(Number);

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    console.warn(`Invalid date for fiscal quarter derivation: "${dateStr}"`);
    return 'Unknown';
  }

  let quarter: number;
  if (month >= 1 && month <= 3) quarter = 1;
  else if (month >= 4 && month <= 6) quarter = 2;
  else if (month >= 7 && month <= 9) quarter = 3;
  else quarter = 4;

  return `${year} Q${quarter}`;
}

/**
 * Get the start date for a fiscal year (calendar year)
 * @param yearsAgo - Number of years to go back (0 = current)
 */
export function getFiscalYearStart(yearsAgo: number = 0): string {
  const now = new Date();
  const targetYear = now.getFullYear() - yearsAgo;
  return `${targetYear}-01-01`;
}

/**
 * Extract year from a fiscal quarter string (e.g., "2025 Q1" -> "2025")
 */
export function extractFiscalYear(fiscalQuarter: string): string {
  return fiscalQuarter.split(' ')[0];
}
