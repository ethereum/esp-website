import { Box, Center, Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactNode } from 'react';
import { FormProvider, useForm, FieldValues, SubmitHandler, DefaultValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as z from 'zod';

import { PageText } from '../UI';
import { SubmitButton } from '../SubmitButton';
import { Captcha } from './fields';
import {
  ContactInformationSection,
  ProjectOverviewSection,
  ProjectDetailsSection,
  AdditionalDetailsSection
} from './sections';

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
  useDefaultLayout?: boolean;
}

export function BaseGrantForm<T extends FieldValues>({
  config,
  schema,
  selectedItem,
  onSubmit: submitFunction,
  defaultValues = {},
  children,
  useDefaultLayout = true
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

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods;

  const onSubmit: SubmitHandler<T> = async data => {
    return submitFunction(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(config.thankYouPageUrl);
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

  // Default form layout
  const defaultFormContent = (
    <Stack spacing={8}>
      <Box
        p={6}
        bg='white'
        borderRadius='lg'
        borderLeft='4px solid'
        borderLeftColor='brand.orange.100'
      >
        <Stack spacing={2}>
          <PageText fontSize='sm' color='brand.helpText' fontWeight='600'>
            {config.selectedItemDisplayText}:
          </PageText>
          <PageText fontSize='lg' fontWeight='700' color='brand.heading'>
            {selectedItem.Name}
          </PageText>
          <PageText fontSize='sm' color='brand.paragraph'>
            {selectedItem.Description__c}
          </PageText>
        </Stack>
      </Box>

      <ContactInformationSection />

      <ProjectOverviewSection includeFileUpload />

      {config.includeProjectDetails && <ProjectDetailsSection />}

      <AdditionalDetailsSection />

      <Center mb={12}>
        <Captcha />
      </Center>

      <Center>
        <SubmitButton
          isValid
          isSubmitting={isSubmitting}
          height='56px'
          width='310px'
          text='Submit Application'
        />
      </Center>
    </Stack>
  );

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
          {useDefaultLayout ? defaultFormContent : children}
        </form>
      </FormProvider>
    </Stack>
  );
}
