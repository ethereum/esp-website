import React, { FC, useCallback, useEffect, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useFormContext } from 'react-hook-form';

export const Captcha: FC = () => {
  const captchaRef = useRef<HCaptcha>(null);
  const { register, reset: resetForm, setValue, getValues, formState } = useFormContext();

  const reset = useCallback(() => {
    const { captchaToken, ...values } = getValues();
    resetForm({ ...values });
  }, [getValues, resetForm]);

  useEffect(() => {
    register('captchaToken', { required: true });
  });

  useEffect(() => {
    // Whenever the form is submitted reset the captcha input
    if (formState.isSubmitted && captchaRef.current) {
      captchaRef.current.resetCaptcha();
      reset();
    }
  }, [formState, reset]);

  const onVerify = (token: string) => {
    setValue('captchaToken', token, { shouldValidate: true });
  };

  const onExpire = () => {
    // when token expires, reset the captcha field
    reset();
  };

  return (
    <HCaptcha
      ref={captchaRef}
      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!}
      onVerify={onVerify}
      onExpire={onExpire}
    />
  );
};
