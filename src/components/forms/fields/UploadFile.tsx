import { FC, MouseEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Box, Flex, Grid, GridItem, Input, InputGroup, Stack } from '@chakra-ui/react';
import Image from 'next/image';

import { PageText } from '../../UI';
import { RemoveIcon } from '../../UI/icons';
import { Field, type Props as FieldProps } from '.';

import uploadSVG from '../../../../public/images/upload.svg';

interface UploadFileProps extends Omit<FieldProps, 'children' | 'error' | 'onDrop'> {
  title: string;
  onDrop: (acceptedFiles: File[]) => void;
}

export const UploadFile: FC<UploadFileProps> = ({ id = 'upload', title, onDrop, ...rest }) => {
  const { control, setValue, getValues } = useFormContext();

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setValue(id, file, { shouldValidate: true });

    onDrop(acceptedFiles);
  };

  const handleRemoveFile = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();

    setValue(id, null, { shouldValidate: true });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });
  const selectedFile = getValues(id);

  return (
    <Controller
      name={id}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Field id={id} error={error} {...rest} {...getRootProps()}>
          <InputGroup>
            <Input
              id={id}
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
                    <PageText fontSize='input' fontWeight={700} mb={2}>
                      {title}
                    </PageText>

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
        </Field>
      )}
    />
  );
};
