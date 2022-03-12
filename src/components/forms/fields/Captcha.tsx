import React, { FC, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useFormContext } from 'react-hook-form';

export const Captcha: FC = () => {
  const { register, reset, setValue, getValues } = useFormContext();

  useEffect(() => {
    register('captchaToken', { required: true });
  });

  const onVerify = (token: string) => {
    setValue('captchaToken', token, { shouldValidate: true });
  };

  const onExpire = () => {
    // when token expires, reset the captcha field
    const { captchaToken, ...values } = getValues();
    reset({ ...values });
  };

  return (
    <HCaptcha
      sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITEKEY!}
      onVerify={onVerify}
      onExpire={onExpire}
    />
  );
};
