import { PaymentPreference } from '../../types';

/**
 * Validation rules for GranteeFinanceForm
 *
 * These are extracted into testable functions to ensure conditional validation
 * works correctly for both Crypto and Fiat payment preferences.
 */

/**
 * Validates that a crypto-specific field (token, network) has a value
 * Only enforces validation when cryptocurrency is selected
 */
export const validateCryptoField = (
  value: string | undefined,
  paymentPreference: PaymentPreference
): boolean => {
  const receivesCrypto = paymentPreference === 'Cryptocurrency';
  // If not receiving crypto, validation passes (skip validation)
  // If receiving crypto, value must not be empty
  return !receivesCrypto || (value !== undefined && value !== '');
};

/**
 * Checks if a crypto-specific field is required based on payment preference
 */
export const isCryptoFieldRequired = (paymentPreference: PaymentPreference): boolean => {
  return paymentPreference === 'Cryptocurrency';
};

/**
 * Validates that a fiat-specific field has a value
 * Only enforces validation when fiat is selected
 */
export const validateFiatField = (
  value: string | undefined,
  paymentPreference: PaymentPreference
): boolean => {
  const receivesFiat = paymentPreference === 'Fiat';
  // If not receiving fiat, validation passes (skip validation)
  // If receiving fiat, value must not be empty
  return !receivesFiat || (value !== undefined && value !== '');
};

/**
 * Checks if a fiat-specific field is required based on payment preference
 */
export const isFiatFieldRequired = (paymentPreference: PaymentPreference): boolean => {
  return paymentPreference === 'Fiat';
};

/**
 * Checks if a common field is required (when any payment preference is set)
 */
export const isCommonFieldRequired = (paymentPreference: PaymentPreference): boolean => {
  return paymentPreference !== '';
};

/**
 * Creates validation rules for crypto-specific fields (token, network)
 * Usage with react-hook-form Controller:
 *
 * ```tsx
 * <Controller
 *   name="token"
 *   rules={createCryptoFieldRules(paymentPreference)}
 *   ...
 * />
 * ```
 */
export const createCryptoFieldRules = (paymentPreference: PaymentPreference) => ({
  required: isCryptoFieldRequired(paymentPreference),
  validate: (value: string) => validateCryptoField(value, paymentPreference)
});

/**
 * Creates validation rules for fiat-specific fields
 */
export const createFiatFieldRules = (paymentPreference: PaymentPreference) => ({
  required: isFiatFieldRequired(paymentPreference),
  validate: (value: string) => validateFiatField(value, paymentPreference)
});
