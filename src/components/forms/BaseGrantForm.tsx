import { Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { FormProvider, useForm, FieldValues, SubmitHandler, DefaultValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as z from 'zod';

import { TOAST_OPTIONS } from '../../constants';
import { FormConfig } from './schemas/BaseGrant';

interface BaseGrantFormProps<T extends FieldValues> {
  config: FormConfig;
  schema: z.ZodTypeAny;
  selectedItem: {
    Id: string;
    Name: string;
    Description__c: string;
  };
  onSubmit: (data: T) => Promise<Response>;
  defaultValues?: Partial<T>;
  children?: ReactNode;
}

export function BaseGrantForm<T extends FieldValues>({
  config,
  schema,
  selectedItem,
  onSubmit: submitFunction,
  defaultValues = {},
  children
}: BaseGrantFormProps<T>) {
  const router = useRouter();
  const toast = useToast();

  const formDefaultValues: DefaultValues<T> = {
    [config.selectedItemIdField]: selectedItem.Id,
    ...defaultValues
  } as DefaultValues<T>;

  const methods = useForm<T>({
    resolver: zodResolver(schema),
    mode: 'all',
    shouldFocusError: true,
    defaultValues: formDefaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<T> = async data => {
    return submitFunction(data)
      .then(async res => {
        if (res.ok) {
          reset();

          // Parse response to get applicationId and csatToken
          try {
            const responseData = await res.json();
            const { applicationId, csatToken } = responseData;

            // Navigate to thank you page with applicationId and CSAT token
            if (applicationId && csatToken) {
              router.push(
                `${config.thankYouPageUrl}?applicationId=${applicationId}&csatToken=${csatToken}`
              );
            } else {
              router.push(config.thankYouPageUrl);
            }
          } catch (error) {
            // If parsing fails, navigate without applicationId
            console.error('Error parsing response:', error);
            router.push(config.thankYouPageUrl);
          }
        } else {
          toast({
            ...TOAST_OPTIONS,
            title: 'Something went wrong while submitting, please try again.',
            status: 'error'
          });
          throw new Error('Network response was not OK');
        }
      })
      .catch(err => console.error('There has been a problem with your operation: ', err.message));
  };

  return (
    <Stack
      w='100%'
      bgGradient='linear(to-br, brand.newsletter.bgGradient.start 10%, brand.newsletter.bgGradient.end 100%)'
      px={{ base: 5, md: 12 }}
      pt={{ base: 8, md: 12 }}
      pb={{ base: 20, md: 16 }}
      borderRadius={{ md: '10px' }}
    >
      <FormProvider {...methods}>
        <form id={config.formId} onSubmit={handleSubmit(onSubmit)}>
          {children}
        </form>
      </FormProvider>
    </Stack>
  );
}
