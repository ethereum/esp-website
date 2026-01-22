import React, { FC, useState, useEffect, useRef } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Image,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { isAddress, getAddress, type Address } from 'viem';

import { PageText } from '../../UI';
import { resolveAddressOrEns, isAvatarSafe } from '../../../lib/ens';

interface Props {
  id: string;
  label: string;
  helpText?: React.ReactNode;
  isRequired?: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export const WalletAddressInput: FC<Props> = ({
  id,
  label,
  helpText,
  isRequired = true,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<
    'empty' | 'typing' | 'resolving' | 'resolved' | 'valid-address' | 'error'
  >('empty');
  const [resolvedAddress, setResolvedAddress] = useState<Address | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const debouncedInput = useDebounce(inputValue.trim(), 200);
  const resolutionIdRef = useRef(0);

  // Hidden field names for form submission
  const resolvedFieldName = `${id}Resolved`;
  const inputTypeFieldName = `${id}InputType`;

  useEffect(() => {
    // Increment ID to cancel any pending resolution
    const currentId = ++resolutionIdRef.current;

    if (!debouncedInput) {
      setStatus('empty');
      setResolvedAddress(null);
      setAvatarUrl(null);
      setValue(resolvedFieldName, '', { shouldValidate: true });
      setValue(inputTypeFieldName, '', { shouldValidate: false });
      return;
    }

    // Quick check for direct address (no async needed)
    if (isAddress(debouncedInput)) {
      const checksummed = getAddress(debouncedInput);
      setStatus('valid-address');
      setResolvedAddress(checksummed);
      setAvatarUrl(null);
      setValue(resolvedFieldName, checksummed, { shouldValidate: true });
      setValue(inputTypeFieldName, 'address', { shouldValidate: false });
      return;
    }

    // Potential ENS - needs async resolution
    if (debouncedInput.includes('.')) {
      setStatus('resolving');
      setAvatarUrl(null);

      resolveAddressOrEns(debouncedInput).then(result => {
        // Check if this resolution is still current
        if (currentId !== resolutionIdRef.current) return;

        if (result.success && result.address) {
          setStatus('resolved');
          setResolvedAddress(result.address);
          setValue(resolvedFieldName, result.address, { shouldValidate: true });
          setValue(inputTypeFieldName, 'ens', { shouldValidate: false });
          setErrorMessage('');

          // Set avatar if available and safe
          if (result.avatar && isAvatarSafe(result.avatar)) {
            setAvatarUrl(result.avatar);
          }
        } else {
          setStatus('error');
          setResolvedAddress(null);
          setValue(resolvedFieldName, '', { shouldValidate: true });
          setValue(inputTypeFieldName, '', { shouldValidate: false });
          setErrorMessage(result.error || 'Resolution failed');
        }
      });
    } else {
      setStatus('error');
      setResolvedAddress(null);
      setValue(resolvedFieldName, '', { shouldValidate: true });
      setValue(inputTypeFieldName, '', { shouldValidate: false });
      setErrorMessage('Enter a valid address (0x...) or ENS name');
    }
  }, [debouncedInput, setValue, resolvedFieldName, inputTypeFieldName]);

  // Sync raw input value to form
  useEffect(() => {
    setValue(id, inputValue);
  }, [inputValue, setValue, id]);

  const getBorderColor = () => {
    switch (status) {
      case 'valid-address':
      case 'resolved':
        return 'green.500';
      case 'error':
        return 'red.500';
      default:
        return 'brand.border';
    }
  };

  const error = errors[resolvedFieldName];

  return (
    <FormControl id={`${id}-control`} isRequired={isRequired}>
      <FormLabel htmlFor={id}>
        <PageText display='inline' fontSize='input'>
          {label}
        </PageText>
      </FormLabel>

      {helpText && (
        <PageText as='small' fontSize='helpText' color='brand.helpText'>
          {helpText}
        </PageText>
      )}

      <InputGroup>
        <Input
          id={id}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='0x... or name.eth'
          bg='white'
          borderRadius={0}
          borderColor={getBorderColor()}
          h='56px'
          _placeholder={{ fontSize: 'input' }}
          color='brand.paragraph'
          fontSize='input'
        />
        <InputRightElement h='56px' w='56px'>
          {status === 'resolving' && <Spinner size='sm' color='brand.ready' />}
          {avatarUrl && status === 'resolved' && (
            <Image
              src={avatarUrl}
              alt='ENS Avatar'
              boxSize='32px'
              borderRadius='full'
              onError={() => setAvatarUrl(null)}
            />
          )}
        </InputRightElement>
      </InputGroup>

      {status === 'resolved' && resolvedAddress && (
        <Box mt={1}>
          <PageText as='small' fontSize='helpText' color='green.600'>
            Resolved: {resolvedAddress.slice(0, 10)}...{resolvedAddress.slice(-8)}
          </PageText>
        </Box>
      )}

      {status === 'valid-address' && (
        <Box mt={1}>
          <PageText as='small' fontSize='helpText' color='green.600'>
            Valid address
          </PageText>
        </Box>
      )}

      {status === 'error' && (
        <Box mt={1}>
          <PageText as='small' fontSize='helpText' color='red.500'>
            {errorMessage}
          </PageText>
        </Box>
      )}

      {error && (
        <Box mt={1}>
          <PageText as='small' fontSize='helpText' color='red.500'>
            {(error as any).message}
          </PageText>
        </Box>
      )}

      {/* Hidden fields for form submission */}
      <input type='hidden' {...register(id)} />
      <input type='hidden' {...register(resolvedFieldName)} />
      <input type='hidden' {...register(inputTypeFieldName)} />
    </FormControl>
  );
};
