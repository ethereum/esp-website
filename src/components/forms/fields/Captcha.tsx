import React, { FC, useCallback, useEffect, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useFormContext } from 'react-hook-form';
import { Box } from '@chakra-ui/react';
import { PageText } from '../../UI';

export const Captcha: FC = () => {
  const captchaRef = useRef<HCaptcha>(null);
  const { register, setValue, formState, resetField } = useFormContext();
  const { errors } = formState;

  useEffect(() => {
    register('captchaToken', { required: true });
  }, [register]);

  const onVerify = useCallback(
    (token: string) => {
      setValue('captchaToken', token);
    },
    [setValue]
  );

  const onExpire = useCallback(() => {
    // when token expires, reset the captcha field
    resetField('captchaToken');
  }, [resetField]);

  return (
    <Box>
      {errors?.captchaToken && (
        <Box mt={1}>
          <PageText as='small' fontSize='helpText' color='red.500'>
            Captcha is required.
          </PageText>
        </Box>
      )}
      <HCaptcha
        ref={captchaRef}
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!}
        onVerify={onVerify}
        onExpire={onExpire}
      />
    </Box>
  );
};
