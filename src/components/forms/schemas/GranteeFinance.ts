import { z } from 'zod';

import { stringFieldSchema } from './utils';
import { MAX_TEXT_LENGTH, MAX_TEXT_AREA_LENGTH } from '../../../constants';

// Shared building blocks for the two Grantee Finance forms (default ETH + DAI/Fiat exception).
//
// Client schemas validate user-facing input only. `token`, `paymentPreference` (default form)
// and the network are system-controlled — they are set by the form/component and re-applied at
// submit time, so they are intentionally NOT part of the client schemas (validating them would
// race the reset/effect logic in the exception form). The server schema below validates them.

const contactFieldsSchema = {
  beneficiaryName: stringFieldSchema('Beneficiary name', { min: 1, max: 100 }),
  contactEmail: z
    .string({ required_error: 'Contact email is required' })
    .email('Invalid email address')
};

const recordFieldsSchema = {
  notes: stringFieldSchema('Notes', { max: MAX_TEXT_AREA_LENGTH }).optional().or(z.literal('')),
  contractID: stringFieldSchema('Contract ID', { min: 1, max: 18 }),
  securityID: stringFieldSchema('Security ID', { min: 1, max: 255 })
};

const cryptoFieldsSchema = {
  // Raw user input (0x... or name.eth) and the resolved/checksummed hex address. Requiring the
  // resolved value gates submission on a successfully resolved wallet (the previous inline rules
  // never enforced this).
  walletAddress: stringFieldSchema('Wallet address', { min: 1 }),
  walletAddressResolved: stringFieldSchema('Wallet address', { min: 1 }),
  // Live input feedback (the "valid address / ENS" hint) is owned by WalletAddressInput; this
  // only gates submission and its message is never rendered, so no custom errorMap is needed.
  walletAddressInputType: z.enum(['address', 'ens']),
  // Boolean end-to-end; the radio renders Yes/No words but stores true/false.
  isCentralizedExchange: z.boolean()
};

const fiatFieldsSchema = {
  beneficiaryAddress: stringFieldSchema('Beneficiary address', { min: 1, max: MAX_TEXT_LENGTH }),
  fiatCurrencyCode: stringFieldSchema('Currency code', { min: 1, max: 3 }),
  bankName: stringFieldSchema('Bank name', { min: 1, max: 100 }),
  bankAddress: stringFieldSchema('Bank address', { min: 1, max: MAX_TEXT_LENGTH }),
  IBAN: stringFieldSchema('IBAN', { min: 1, max: 50 }),
  SWIFTCode: stringFieldSchema('SWIFT code', { min: 1, max: 100 })
};

const captchaSchema = {
  captchaToken: stringFieldSchema('Captcha', { min: 1 })
};

// Default form: ETH-only, always crypto. No payment-preference selector.
export const granteeFinanceSchema = z.object({
  ...contactFieldsSchema,
  ...cryptoFieldsSchema,
  ...recordFieldsSchema,
  ...captchaSchema
});

export type GranteeFinanceData = z.infer<typeof granteeFinanceSchema>;

// Exception form: discriminated on the (relabeled) payment-preference radio. The underlying SF
// picklist values stay 'Cryptocurrency' / 'Fiat'.
const exceptionCryptoSchema = z.object({
  paymentPreference: z.literal('Cryptocurrency'),
  ...contactFieldsSchema,
  ...cryptoFieldsSchema,
  ...recordFieldsSchema,
  ...captchaSchema
});

const exceptionFiatSchema = z.object({
  paymentPreference: z.literal('Fiat'),
  ...contactFieldsSchema,
  ...fiatFieldsSchema,
  ...recordFieldsSchema,
  ...captchaSchema
});

export const granteeFinanceExceptionSchema = z.discriminatedUnion('paymentPreference', [
  exceptionCryptoSchema,
  exceptionFiatSchema
]);

export type GranteeFinanceExceptionData = z.infer<typeof granteeFinanceExceptionSchema>;

// Loose superset used as the react-hook-form field-values type (and the client api submit input)
// for BOTH forms. Common fields reuse the validated groups above so they can't drift; the
// method-specific groups are optional (only one payment path renders per form) and a few
// system-controlled fields stay loose because the forms set/reset them to '' directly. This is a
// type source only — it is never used to parse; per-form validation is done by the schemas above.
const granteeFinanceFormDataSchema = z.object({
  ...contactFieldsSchema,
  ...recordFieldsSchema,
  ...captchaSchema,
  paymentPreference: z.enum(['Cryptocurrency', 'Fiat', '']),
  // Crypto path (optional)
  walletAddress: z.string().optional(),
  walletAddressResolved: z.string().optional(),
  walletAddressInputType: z.enum(['address', 'ens', '']).optional(),
  token: z.enum(['ETH', 'DAI', '']).optional(),
  isCentralizedExchange: z.boolean().optional(),
  // Fiat path (optional)
  beneficiaryAddress: z.string().optional(),
  fiatCurrencyCode: z.string().optional(),
  bankName: z.string().optional(),
  bankAddress: z.string().optional(),
  IBAN: z.string().optional(),
  SWIFTCode: z.string().optional()
});

export type GranteeFinanceFormData = z.infer<typeof granteeFinanceFormDataSchema>;

// Server schema: validates the request body for BOTH forms. Method-specific fields are
// optional because each form sends only the keys relevant to its payment method, and the handler
// writes each field only when present. Unknown keys (e.g. captchaToken) are stripped by default.
export const granteeFinanceServerSchema = z.object({
  paymentPreference: z.enum(['Cryptocurrency', 'Fiat']),
  beneficiaryName: stringFieldSchema('Beneficiary name', { min: 1, max: 100 }),
  contactEmail: z.string().email('Invalid email address'),
  notes: z.string().max(MAX_TEXT_AREA_LENGTH).optional(),
  contractID: stringFieldSchema('Contract ID', { min: 1, max: 18 }),
  securityID: stringFieldSchema('Security ID', { min: 1, max: 255 }),
  // Crypto (present only on crypto submissions)
  walletAddress: z.string().optional(),
  walletAddressResolved: z.string().optional(),
  walletAddressInputType: z.enum(['address', 'ens', '']).optional(),
  token: z.enum(['ETH', 'DAI', '']).optional(),
  isCentralizedExchange: z.boolean().optional(),
  // Fiat (present only on fiat submissions)
  beneficiaryAddress: z.string().max(MAX_TEXT_LENGTH).optional(),
  fiatCurrencyCode: z.string().max(3).optional(),
  bankName: z.string().max(100).optional(),
  bankAddress: z.string().max(MAX_TEXT_LENGTH).optional(),
  IBAN: z.string().max(50).optional(),
  SWIFTCode: z.string().max(100).optional()
});

export type GranteeFinanceServerData = z.infer<typeof granteeFinanceServerSchema>;
