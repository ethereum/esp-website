import { forwardRef } from 'react';

// Stand-in for @hcaptcha/react-hcaptcha used in form tests: a button that fires onVerify with a
// fake token when clicked, mirroring how the real widget calls onVerify after a human solves the
// challenge. forwardRef so the real Captcha component's `ref={captchaRef}` doesn't trigger React's
// "Function components cannot be given refs" warning (the ref is intentionally unused).
export const MockHCaptcha = forwardRef<unknown, { onVerify: (token: string) => void }>(
  ({ onVerify }, _ref) => (
    <button type='button' data-testid='mock-hcaptcha' onClick={() => onVerify('test-captcha-token')}>
      solve captcha
    </button>
  )
);

MockHCaptcha.displayName = 'MockHCaptcha';

export default MockHCaptcha;
