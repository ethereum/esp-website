/**
 * Derive EF fiscal quarter from activation date
 * EF Fiscal Year runs July 1 - June 30
 * FY25 = July 1, 2024 - June 30, 2025
 * Q1 = Jul-Sep, Q2 = Oct-Dec, Q3 = Jan-Mar, Q4 = Apr-Jun
 */
export function deriveFiscalQuarter(dateStr: string): string {
  const [year, month] = dateStr.split('-').map(Number);

  const fiscalYear = month >= 7 ? year + 1 : year;

  let quarter: number;
  if (month >= 7 && month <= 9) quarter = 1;
  else if (month >= 10 && month <= 12) quarter = 2;
  else if (month >= 1 && month <= 3) quarter = 3;
  else quarter = 4;

  return `FY${String(fiscalYear).slice(-2)} Q${quarter}`;
}

/**
 * Get the start date for a fiscal year
 * @param yearsAgo - Number of fiscal years to go back (0 = current)
 */
export function getFiscalYearStart(yearsAgo: number = 0): string {
  const now = new Date();
  const fiscalYearStart = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
  const targetYear = fiscalYearStart - yearsAgo;
  return `${targetYear}-07-01`;
}

/**
 * Extract fiscal year from a fiscal quarter string (e.g., "FY25 Q1" -> "FY25")
 */
export function extractFiscalYear(fiscalQuarter: string): string {
  return fiscalQuarter.split(' ')[0];
}
