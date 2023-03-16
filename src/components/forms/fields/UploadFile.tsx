import { FC, MouseEvent, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  ChakraProps,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Stack
} from '@chakra-ui/react';
import Image from 'next/image';

import { PageText } from '../../UI';
import { RemoveIcon } from '../../UI/icons';
import { MAX_PROPOSAL_FILE_SIZE } from '../../../constants';

import uploadSVG from '../../../../public/images/upload.svg';

interface UploadFileProps extends ChakraProps {
  name?: string;
  title: string;
  onDrop: (acceptedFiles: File[]) => void;
}

export const UploadFile: FC<UploadFileProps> = ({ name = 'upload', title, onDrop, ...rest }) => {
  const { control, formState, setValue, getValues } = useFormContext();

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setValue(name, file, { shouldValidate: true });

    onDrop(acceptedFiles);
  };

  const handleRemoveFile = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();

    setValue(name, null, { shouldValidate: true });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });
  const selectedFile = getValues(name);

  const { errors } = formState;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
        validate: file => (file ? file.size < MAX_PROPOSAL_FILE_SIZE : true)
      }}
      render={({ field: { onChange } }) => (
        <FormControl id={name} {...rest} {...getRootProps()}>
          <InputGroup>
            <Input
              id={name}
              type='file'
              role='button'
              aria-label='File Upload'
              hidden
              onChange={onChange}
              {...getInputProps({ name: 'base64' })}
            />
            <Box
              w='100%'
              cursor='pointer'
              bgColor='brand.upload.bg'
              justifyContent='space-evenly'
              py={9}
              px={{ base: 6, md: 16 }}
            >
              <Grid templateColumns='150px 1fr'>
                <GridItem alignSelf='center'>
                  <Box mr={6} flexShrink={0}>
                    <Image src={uploadSVG} alt='Upload file' height={42} width={44} />
                  </Box>
                </GridItem>
                <GridItem mb={selectedFile ? 4 : 0}>
                  <Stack>
                    <FormLabel htmlFor={name}>
                      <PageText fontSize='input' fontWeight={700} mb={2}>
                        {title}
                      </PageText>
                    </FormLabel>

                    <PageText
                      as='small'
                      fontSize='helpText'
                      color='brand.helpText'
                      lineHeight='17px'
                      display='inline-block'
                      mb={2}
                    >
                      Click here or drag file to this box.
                    </PageText>
                  </Stack>

                  {selectedFile && errors[name] && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        File size cannot exceed 4mb.
                      </PageText>
                    </Box>
                  )}
                </GridItem>
                <GridItem colStart={2}>
                  {selectedFile && (
                    <Flex
                      display='inline-flex'
                      alignItems='center'
                      justifyContent='space-between'
                      bg='brand.upload.filename'
                      minW='175px'
                      pl={4}
                      py={2}
                      borderRadius='5px'
                    >
                      <PageText mr={2}>{selectedFile.name}</PageText>
                      <Flex role='button' onClick={handleRemoveFile} px={3}>
                        <RemoveIcon />
                      </Flex>
                    </Flex>
                  )}
                </GridItem>
              </Grid>
            </Box>
          </InputGroup>
        </FormControl>
      )}
    />
  );
};
