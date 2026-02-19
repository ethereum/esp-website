import { describe, it, expect } from 'vitest';
import {
  validateCryptoField,
  validateFiatField,
  isCryptoFieldRequired,
  isFiatFieldRequired,
  isCommonFieldRequired,
  createCryptoFieldRules,
  createFiatFieldRules
} from '../../components/forms/granteeFinanceValidation';
import { PaymentPreference } from '../../types';

/**
 * GranteeFinanceForm Validation Tests
 *
 * These tests ensure that conditional validation works correctly for the
 * GranteeFinanceForm, preventing issues like:
 * - Fiat form submissions blocked by crypto field validation
 * - Crypto form submissions blocked by fiat field validation
 *
 * The bug that prompted these tests (PR #517):
 * Token and network fields had `validate: value => value !== ''` which always
 * ran regardless of payment preference, causing Fiat submissions to fail.
 */

describe('GranteeFinanceForm Validation', () => {
  describe('validateCryptoField', () => {
    describe('when Cryptocurrency is selected', () => {
      const paymentPreference: PaymentPreference = 'Cryptocurrency';

      it('should return true when field has a value', () => {
        expect(validateCryptoField('ETH', paymentPreference)).toBe(true);
        expect(validateCryptoField('DAI', paymentPreference)).toBe(true);
        expect(validateCryptoField('mainnet', paymentPreference)).toBe(true);
      });

      it('should return false when field is empty', () => {
        expect(validateCryptoField('', paymentPreference)).toBe(false);
      });

      it('should return false when field is undefined', () => {
        expect(validateCryptoField(undefined, paymentPreference)).toBe(false);
      });
    });

    describe('when Fiat is selected', () => {
      const paymentPreference: PaymentPreference = 'Fiat';

      it('should return true regardless of value (skip validation)', () => {
        expect(validateCryptoField('', paymentPreference)).toBe(true);
        expect(validateCryptoField(undefined, paymentPreference)).toBe(true);
        expect(validateCryptoField('ETH', paymentPreference)).toBe(true);
      });
    });

    describe('when no payment preference is selected', () => {
      const paymentPreference: PaymentPreference = '';

      it('should return true regardless of value (skip validation)', () => {
        expect(validateCryptoField('', paymentPreference)).toBe(true);
        expect(validateCryptoField(undefined, paymentPreference)).toBe(true);
      });
    });
  });

  describe('validateFiatField', () => {
    describe('when Fiat is selected', () => {
      const paymentPreference: PaymentPreference = 'Fiat';

      it('should return true when field has a value', () => {
        expect(validateFiatField('Test Bank', paymentPreference)).toBe(true);
        expect(validateFiatField('EUR', paymentPreference)).toBe(true);
        expect(validateFiatField('DE89370400440532013000', paymentPreference)).toBe(true);
      });

      it('should return false when field is empty', () => {
        expect(validateFiatField('', paymentPreference)).toBe(false);
      });

      it('should return false when field is undefined', () => {
        expect(validateFiatField(undefined, paymentPreference)).toBe(false);
      });
    });

    describe('when Cryptocurrency is selected', () => {
      const paymentPreference: PaymentPreference = 'Cryptocurrency';

      it('should return true regardless of value (skip validation)', () => {
        expect(validateFiatField('', paymentPreference)).toBe(true);
        expect(validateFiatField(undefined, paymentPreference)).toBe(true);
        expect(validateFiatField('Test Bank', paymentPreference)).toBe(true);
      });
    });

    describe('when no payment preference is selected', () => {
      const paymentPreference: PaymentPreference = '';

      it('should return true regardless of value (skip validation)', () => {
        expect(validateFiatField('', paymentPreference)).toBe(true);
        expect(validateFiatField(undefined, paymentPreference)).toBe(true);
      });
    });
  });

  describe('isCryptoFieldRequired', () => {
    it('should return true when Cryptocurrency is selected', () => {
      expect(isCryptoFieldRequired('Cryptocurrency')).toBe(true);
    });

    it('should return false when Fiat is selected', () => {
      expect(isCryptoFieldRequired('Fiat')).toBe(false);
    });

    it('should return false when no preference is selected', () => {
      expect(isCryptoFieldRequired('')).toBe(false);
    });
  });

  describe('isFiatFieldRequired', () => {
    it('should return true when Fiat is selected', () => {
      expect(isFiatFieldRequired('Fiat')).toBe(true);
    });

    it('should return false when Cryptocurrency is selected', () => {
      expect(isFiatFieldRequired('Cryptocurrency')).toBe(false);
    });

    it('should return false when no preference is selected', () => {
      expect(isFiatFieldRequired('')).toBe(false);
    });
  });

  describe('isCommonFieldRequired', () => {
    it('should return true when Cryptocurrency is selected', () => {
      expect(isCommonFieldRequired('Cryptocurrency')).toBe(true);
    });

    it('should return true when Fiat is selected', () => {
      expect(isCommonFieldRequired('Fiat')).toBe(true);
    });

    it('should return false when no preference is selected', () => {
      expect(isCommonFieldRequired('')).toBe(false);
    });
  });

  describe('createCryptoFieldRules', () => {
    describe('when Cryptocurrency is selected', () => {
      const rules = createCryptoFieldRules('Cryptocurrency');

      it('should set required to true', () => {
        expect(rules.required).toBe(true);
      });

      it('should validate non-empty values as valid', () => {
        expect(rules.validate('ETH')).toBe(true);
      });

      it('should validate empty values as invalid', () => {
        expect(rules.validate('')).toBe(false);
      });
    });

    describe('when Fiat is selected', () => {
      const rules = createCryptoFieldRules('Fiat');

      it('should set required to false', () => {
        expect(rules.required).toBe(false);
      });

      it('should validate all values as valid (skip validation)', () => {
        expect(rules.validate('')).toBe(true);
        expect(rules.validate('ETH')).toBe(true);
      });
    });
  });

  describe('createFiatFieldRules', () => {
    describe('when Fiat is selected', () => {
      const rules = createFiatFieldRules('Fiat');

      it('should set required to true', () => {
        expect(rules.required).toBe(true);
      });

      it('should validate non-empty values as valid', () => {
        expect(rules.validate('Test Bank')).toBe(true);
      });

      it('should validate empty values as invalid', () => {
        expect(rules.validate('')).toBe(false);
      });
    });

    describe('when Cryptocurrency is selected', () => {
      const rules = createFiatFieldRules('Cryptocurrency');

      it('should set required to false', () => {
        expect(rules.required).toBe(false);
      });

      it('should validate all values as valid (skip validation)', () => {
        expect(rules.validate('')).toBe(true);
        expect(rules.validate('Test Bank')).toBe(true);
      });
    });
  });

  /**
   * Regression tests for specific bug scenarios
   */
  describe('Regression Tests', () => {
    describe('PR #517: Fiat form submission blocked by crypto field validation', () => {
      it('should allow Fiat submission when crypto fields are empty', () => {
        const paymentPreference: PaymentPreference = 'Fiat';

        // Token and network fields are empty (as they should be for Fiat)
        const tokenValid = validateCryptoField('', paymentPreference);
        const networkValid = validateCryptoField('', paymentPreference);

        // Fiat fields are filled
        const bankNameValid = validateFiatField('Test Bank', paymentPreference);
        const ibanValid = validateFiatField('DE89370400440532013000', paymentPreference);

        expect(tokenValid).toBe(true);
        expect(networkValid).toBe(true);
        expect(bankNameValid).toBe(true);
        expect(ibanValid).toBe(true);
      });

      it('should allow Crypto submission when fiat fields are empty', () => {
        const paymentPreference: PaymentPreference = 'Cryptocurrency';

        // Fiat fields are empty (as they should be for Crypto)
        const bankNameValid = validateFiatField('', paymentPreference);
        const ibanValid = validateFiatField('', paymentPreference);

        // Crypto fields are filled
        const tokenValid = validateCryptoField('ETH', paymentPreference);
        const networkValid = validateCryptoField('mainnet', paymentPreference);

        expect(bankNameValid).toBe(true);
        expect(ibanValid).toBe(true);
        expect(tokenValid).toBe(true);
        expect(networkValid).toBe(true);
      });
    });

    describe('Payment preference switching', () => {
      it('should correctly validate after switching from Crypto to Fiat', () => {
        // Simulate user first selecting Crypto, then switching to Fiat
        // Token/network values get reset to empty on switch

        // First state: Crypto selected with values
        let paymentPreference: PaymentPreference = 'Cryptocurrency';
        expect(validateCryptoField('ETH', paymentPreference)).toBe(true);

        // After switch: Fiat selected, crypto fields reset to empty
        paymentPreference = 'Fiat';
        expect(validateCryptoField('', paymentPreference)).toBe(true); // Should pass now
        expect(validateFiatField('Test Bank', paymentPreference)).toBe(true);
      });

      it('should correctly validate after switching from Fiat to Crypto', () => {
        // Simulate user first selecting Fiat, then switching to Crypto
        // Fiat field values get reset to empty on switch

        // First state: Fiat selected with values
        let paymentPreference: PaymentPreference = 'Fiat';
        expect(validateFiatField('Test Bank', paymentPreference)).toBe(true);

        // After switch: Crypto selected, fiat fields reset to empty
        paymentPreference = 'Cryptocurrency';
        expect(validateFiatField('', paymentPreference)).toBe(true); // Should pass now
        expect(validateCryptoField('ETH', paymentPreference)).toBe(true);
      });
    });
  });
});
