import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { computeRoundStatus, RoundStatus } from '../../lib/rounds';

describe('computeRoundStatus', () => {
  // Store original Date.now
  const originalDateNow = Date.now;

  afterEach(() => {
    // Restore Date.now after each test
    vi.restoreAllMocks();
    Date.now = originalDateNow;
  });

  /**
   * Helper to mock the current time
   * @param isoString - ISO 8601 date string (e.g., '2026-03-15T12:00:00Z')
   */
  function mockCurrentTime(isoString: string) {
    const timestamp = new Date(isoString).getTime();
    Date.now = vi.fn(() => timestamp);
  }

  describe('AoE timezone conversion', () => {
    // AoE (Anywhere on Earth) is UTC-12
    // So 00:00:00 AoE = 12:00:00 UTC (same day)
    // And 23:59:59 AoE = 11:59:59 UTC (next day)

    it('should treat startDate as 00:00:00 AoE (12:00:00 UTC same day)', () => {
      const startDate = '2026-02-02';
      const endDate = '2026-04-01';

      // Just before start: Feb 2nd 11:59:59 UTC (23:59:59 AoE Feb 1st)
      mockCurrentTime('2026-02-02T11:59:59Z');
      expect(computeRoundStatus(startDate, endDate)).toBe('upcoming');

      // Exactly at start: Feb 2nd 12:00:00 UTC (00:00:00 AoE Feb 2nd)
      mockCurrentTime('2026-02-02T12:00:00Z');
      expect(computeRoundStatus(startDate, endDate)).toBe('active');
    });

    it('should treat endDate as 23:59:59 AoE (11:59:59 UTC next day)', () => {
      const startDate = '2026-02-02';
      const endDate = '2026-04-01';

      // Just before end: Apr 2nd 11:59:59 UTC (23:59:59 AoE Apr 1st)
      mockCurrentTime('2026-04-02T11:59:59Z');
      expect(computeRoundStatus(startDate, endDate)).toBe('active');

      // Just after end: Apr 2nd 12:00:00 UTC (00:00:00 AoE Apr 2nd)
      mockCurrentTime('2026-04-02T12:00:00Z');
      expect(computeRoundStatus(startDate, endDate)).toBe('closed');
    });
  });

  describe('status computation', () => {
    const startDate = '2026-02-02';
    const endDate = '2026-04-01';

    it('should return "upcoming" before the start date', () => {
      mockCurrentTime('2026-01-15T00:00:00Z');
      expect(computeRoundStatus(startDate, endDate)).toBe('upcoming');
    });

    it('should return "active" during the round period', () => {
      mockCurrentTime('2026-03-15T12:00:00Z');
      expect(computeRoundStatus(startDate, endDate)).toBe('active');
    });

    it('should return "closed" after the end date', () => {
      mockCurrentTime('2026-05-01T00:00:00Z');
      expect(computeRoundStatus(startDate, endDate)).toBe('closed');
    });
  });

  describe('effective date overrides', () => {
    const startDate = '2026-02-02';
    const endDate = '2026-04-01';

    it('should use effectiveStartDate when provided', () => {
      const effectiveStartDate = '2026-02-05'; // 3 days later

      // Feb 3rd - after display start but before effective start
      mockCurrentTime('2026-02-03T14:00:00Z');
      expect(computeRoundStatus(startDate, endDate, effectiveStartDate)).toBe('upcoming');

      // Feb 5th 12:00 UTC - at effective start
      mockCurrentTime('2026-02-05T12:00:00Z');
      expect(computeRoundStatus(startDate, endDate, effectiveStartDate)).toBe('active');
    });

    it('should use effectiveEndDate when provided', () => {
      const effectiveEndDate = '2026-04-03'; // 2 days extension

      // Apr 2nd 08:00 UTC - after display end but before effective end
      mockCurrentTime('2026-04-02T08:00:00Z');
      expect(computeRoundStatus(startDate, endDate, undefined, effectiveEndDate)).toBe('active');

      // Apr 3rd 12:00 UTC - after effective end (00:00 AoE Apr 4th)
      mockCurrentTime('2026-04-04T12:00:00Z');
      expect(computeRoundStatus(startDate, endDate, undefined, effectiveEndDate)).toBe('closed');
    });

    it('should use both effective dates when provided', () => {
      const effectiveStartDate = '2026-02-05';
      const effectiveEndDate = '2026-04-03';

      // Before effective start
      mockCurrentTime('2026-02-04T00:00:00Z');
      expect(computeRoundStatus(startDate, endDate, effectiveStartDate, effectiveEndDate)).toBe('upcoming');

      // During effective period
      mockCurrentTime('2026-03-15T00:00:00Z');
      expect(computeRoundStatus(startDate, endDate, effectiveStartDate, effectiveEndDate)).toBe('active');

      // After effective end
      mockCurrentTime('2026-04-05T00:00:00Z');
      expect(computeRoundStatus(startDate, endDate, effectiveStartDate, effectiveEndDate)).toBe('closed');
    });

    it('should fall back to display dates when effective dates are undefined', () => {
      mockCurrentTime('2026-03-15T12:00:00Z');
      expect(computeRoundStatus(startDate, endDate, undefined, undefined)).toBe('active');
    });
  });

  describe('edge cases', () => {
    it('should handle same start and end date (single day round)', () => {
      const singleDay = '2026-03-15';

      // Before the day starts (AoE)
      mockCurrentTime('2026-03-15T11:59:59Z');
      expect(computeRoundStatus(singleDay, singleDay)).toBe('upcoming');

      // During the day (AoE)
      mockCurrentTime('2026-03-15T12:00:00Z');
      expect(computeRoundStatus(singleDay, singleDay)).toBe('active');

      // Still during (until 23:59:59 AoE = 11:59:59 UTC next day)
      mockCurrentTime('2026-03-16T11:59:59Z');
      expect(computeRoundStatus(singleDay, singleDay)).toBe('active');

      // After the day ends (AoE)
      mockCurrentTime('2026-03-16T12:00:00Z');
      expect(computeRoundStatus(singleDay, singleDay)).toBe('closed');
    });

    it('should handle year boundaries correctly', () => {
      const startDate = '2025-12-31';
      const endDate = '2026-01-02';

      // New Year's Eve (active)
      mockCurrentTime('2025-12-31T20:00:00Z');
      expect(computeRoundStatus(startDate, endDate)).toBe('active');

      // New Year's Day (active)
      mockCurrentTime('2026-01-01T00:00:00Z');
      expect(computeRoundStatus(startDate, endDate)).toBe('active');

      // After Jan 2nd AoE
      mockCurrentTime('2026-01-03T12:00:00Z');
      expect(computeRoundStatus(startDate, endDate)).toBe('closed');
    });
  });
});
