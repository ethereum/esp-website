import { z } from 'zod';

import { stringFieldSchema } from './utils';
import { MAX_TEXT_LENGTH, MAX_TEXT_AREA_LENGTH } from '../../../constants';

// Shared building blocks for the two Grantee Finance forms (default ETH + DAI/Fiat exception).
//
// Each form has exactly one schema and uses its inferred type as the react-hook-form values type.
// The default form's payment method and token are fixed, so its schema pins them as literals. The
// exception form's token is injected at submit time (DAI), so it is not a form field; the network
// is always set server-side. The server schema below validates the final request body for both.

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

// Default form: ETH-only, always crypto. No payment-preference selector; paymentPreference and
// token are fixed literals set via the form's defaultValues.
export const granteeFinanceSchema = z.object({
  paymentPreference: z.literal('Cryptocurrency'),
  token: z.literal('ETH'),
  ...contactFieldsSchema,
  ...cryptoFieldsSchema,
  ...recordFieldsSchema,
  ...captchaSchema
});

export type GranteeFinanceFormData = z.infer<typeof granteeFinanceSchema>;

// Exception form: a single flat schema so react-hook-form can watch/reset individual fields. The
// relabeled radio (Stablecoin/Fiat) maps to the SF picklist values 'Cryptocurrency' / 'Fiat', which
// drive which method fields are required (enforced by superRefine). token is injected at submit
// time (DAI), so it is not a field here.
export const granteeFinanceExceptionSchema = z
  .object({
    // '' is the initial (unselected) radio state; a real choice is gated by the hidden submit
    // button and re-validated server-side, where only 'Cryptocurrency' / 'Fiat' are accepted.
    paymentPreference: z.enum(['Cryptocurrency', 'Fiat', '']),
    ...contactFieldsSchema,
    ...recordFieldsSchema,
    ...captchaSchema,
    // Crypto path — required when paymentPreference === 'Cryptocurrency' (see superRefine).
    walletAddress: z.string().optional(),
    walletAddressResolved: z.string().optional(),
    walletAddressInputType: z.enum(['address', 'ens', '']).optional(),
    isCentralizedExchange: z.boolean().optional(),
    // Fiat path — required when paymentPreference === 'Fiat' (see superRefine).
    beneficiaryAddress: z.string().max(MAX_TEXT_LENGTH).optional(),
    fiatCurrencyCode: z.string().max(3).optional(),
    bankName: z.string().max(100).optional(),
    bankAddress: z.string().max(MAX_TEXT_LENGTH).optional(),
    IBAN: z.string().max(50).optional(),
    SWIFTCode: z.string().max(100).optional()
  })
  .superRefine((data, ctx) => {
    if (data.paymentPreference === 'Cryptocurrency') {
      if (!data.walletAddressResolved) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['walletAddressResolved'],
          message: 'Wallet address is required'
        });
      }
    } else if (data.paymentPreference === 'Fiat') {
      const requiredFiatFields: Record<string, string> = {
        beneficiaryAddress: 'Beneficiary address is required',
        fiatCurrencyCode: 'Currency code is required',
        bankName: 'Bank name is required',
        bankAddress: 'Bank address is required',
        IBAN: 'IBAN is required',
        SWIFTCode: 'SWIFT code is required'
      };
      for (const [field, message] of Object.entries(requiredFiatFields)) {
        if (!data[field as keyof typeof data]) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: [field], message });
        }
      }
    }
  });

export type GranteeFinanceExceptionData = z.infer<typeof granteeFinanceExceptionSchema>;

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
