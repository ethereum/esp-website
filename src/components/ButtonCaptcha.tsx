import React, { FC } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface Props {
  onVerify: (token: string, ekey: string) => void;
  onExpire: () => void;
}

export const ButtonCaptcha: FC<Props> = ({ onVerify, onExpire }) => {
  return (
    <HCaptcha
      sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITEKEY!}
      onVerify={onVerify}
      onExpire={onExpire}
    />
  );
};
