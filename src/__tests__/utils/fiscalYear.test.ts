import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  deriveFiscalQuarter,
  getFiscalYearStart,
  extractFiscalYear
} from '../../utils/fiscalYear';

describe('deriveFiscalQuarter', () => {
  describe('Q1 (January - March)', () => {
    it('should return Q1 for January', () => {
      expect(deriveFiscalQuarter('2025-01-15')).toBe('2025 Q1');
    });

    it('should return Q1 for February', () => {
      expect(deriveFiscalQuarter('2025-02-28')).toBe('2025 Q1');
    });

    it('should return Q1 for March', () => {
      expect(deriveFiscalQuarter('2025-03-31')).toBe('2025 Q1');
    });
  });

  describe('Q2 (April - June)', () => {
    it('should return Q2 for April', () => {
      expect(deriveFiscalQuarter('2025-04-01')).toBe('2025 Q2');
    });

    it('should return Q2 for May', () => {
      expect(deriveFiscalQuarter('2025-05-15')).toBe('2025 Q2');
    });

    it('should return Q2 for June', () => {
      expect(deriveFiscalQuarter('2025-06-30')).toBe('2025 Q2');
    });
  });

  describe('Q3 (July - September)', () => {
    it('should return Q3 for July', () => {
      expect(deriveFiscalQuarter('2025-07-04')).toBe('2025 Q3');
    });

    it('should return Q3 for August', () => {
      expect(deriveFiscalQuarter('2025-08-20')).toBe('2025 Q3');
    });

    it('should return Q3 for September', () => {
      expect(deriveFiscalQuarter('2025-09-30')).toBe('2025 Q3');
    });
  });

  describe('Q4 (October - December)', () => {
    it('should return Q4 for October', () => {
      expect(deriveFiscalQuarter('2025-10-01')).toBe('2025 Q4');
    });

    it('should return Q4 for November', () => {
      expect(deriveFiscalQuarter('2025-11-15')).toBe('2025 Q4');
    });

    it('should return Q4 for December', () => {
      expect(deriveFiscalQuarter('2025-12-31')).toBe('2025 Q4');
    });
  });

  describe('Year handling', () => {
    it('should handle different years correctly', () => {
      expect(deriveFiscalQuarter('2020-06-15')).toBe('2020 Q2');
      expect(deriveFiscalQuarter('2024-01-01')).toBe('2024 Q1');
      expect(deriveFiscalQuarter('2030-12-25')).toBe('2030 Q4');
    });
  });
});

describe('getFiscalYearStart', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return January 1st of current year when yearsAgo is 0', () => {
    vi.setSystemTime(new Date('2025-06-15'));
    expect(getFiscalYearStart(0)).toBe('2025-01-01');
  });

  it('should return January 1st of previous year when yearsAgo is 1', () => {
    vi.setSystemTime(new Date('2025-06-15'));
    expect(getFiscalYearStart(1)).toBe('2024-01-01');
  });

  it('should return January 1st of 2 years ago when yearsAgo is 2', () => {
    vi.setSystemTime(new Date('2025-06-15'));
    expect(getFiscalYearStart(2)).toBe('2023-01-01');
  });

  it('should default to current year when no argument provided', () => {
    vi.setSystemTime(new Date('2026-03-20'));
    expect(getFiscalYearStart()).toBe('2026-01-01');
  });

  it('should work at year boundaries (January 1st)', () => {
    vi.setSystemTime(new Date('2025-01-01'));
    expect(getFiscalYearStart(0)).toBe('2025-01-01');
    expect(getFiscalYearStart(1)).toBe('2024-01-01');
  });

  it('should work at year boundaries (December 31st)', () => {
    vi.setSystemTime(new Date('2025-12-31'));
    expect(getFiscalYearStart(0)).toBe('2025-01-01');
    expect(getFiscalYearStart(1)).toBe('2024-01-01');
  });
});

describe('extractFiscalYear', () => {
  it('should extract year from Q1 string', () => {
    expect(extractFiscalYear('2025 Q1')).toBe('2025');
  });

  it('should extract year from Q4 string', () => {
    expect(extractFiscalYear('2024 Q4')).toBe('2024');
  });

  it('should handle different year formats', () => {
    expect(extractFiscalYear('2020 Q2')).toBe('2020');
    expect(extractFiscalYear('2030 Q3')).toBe('2030');
  });
});
