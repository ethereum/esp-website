import { FC, useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FileRejection, useDropzone, DropzoneProps, ErrorCode } from 'react-dropzone';
import { Box, Flex, Grid, GridItem, Input, InputGroup, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import prettyBytes from 'pretty-bytes';

import { PageText } from '../../UI';
import { RemoveIcon } from '../../UI/icons';
import { Field, type Props as FieldProps } from '.';

import uploadSVG from '../../../../public/images/upload.svg';
import { MAX_PROPOSAL_FILE_SIZE } from '../../../constants';
import { MAX_PROPOSAL_FILE_COUNT } from '../../../constants';

interface UploadFileProps extends Omit<FieldProps, 'children' | 'error' | 'onDrop'> {
  title: string;
  multiple?: boolean;
  onDrop?: (acceptedFiles: File[]) => void;
  dropzoneProps?: DropzoneProps;
}

export const UploadFile: FC<UploadFileProps> = ({
  id = 'upload',
  title,
  onDrop,
  multiple = false,
  dropzoneProps = {
    maxFiles: MAX_PROPOSAL_FILE_COUNT,
    maxSize: MAX_PROPOSAL_FILE_SIZE
  },
  ...rest
}) => {
  const { control, setValue, setError, watch } = useFormContext();

  const files = watch(id) as File[] | null;

  const handleDrop = useCallback(
    (files: File[]) => {
      setValue(id, files, { shouldValidate: true });
      onDrop?.(files);
    },
    [id, onDrop, setValue]
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      if (fileRejections.length === 0) return;

      // handle too many files
      if (
        fileRejections.some(rejection =>
          rejection.errors.some(error => error.code === ErrorCode.TooManyFiles)
        )
      ) {
        setError(id, {
          type: ErrorCode.TooManyFiles,
          message: `You can only upload up to ${MAX_PROPOSAL_FILE_COUNT} files.`
        });
      }

      // handle file too large
      if (
        fileRejections.some(rejection =>
          rejection.errors.some(error => error.code === ErrorCode.FileTooLarge)
        )
      ) {
        setError(id, {
          type: ErrorCode.FileTooLarge,
          message: `File size cannot exceed ${prettyBytes(MAX_PROPOSAL_FILE_SIZE, {
            binary: true
          })}`
        });
      }
    },
    [id, setError]
  );

  const removeFile = (file: File) => {
    const newFiles = files?.filter(f => f.name !== file.name);
    setValue(id, newFiles, { shouldValidate: true });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected,
    multiple,
    ...dropzoneProps
  });

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
              onChange={e => onChange(multiple ? e.target.files : e.target.files?.[0] ?? null)}
              {...getInputProps({ name: 'base64' })}
            />
            <Box
              w='100%'
              cursor='pointer'
              bgColor='brand.upload.bg'
              justifyContent='space-evenly'
              py={9}
              px={{ base: 6, md: 16 }}
              mt={4}
            >
              <Grid templateColumns='150px 1fr'>
                <GridItem alignSelf='center'>
                  <Box mr={6} flexShrink={0}>
                    <Image src={uploadSVG} alt='Upload file' height={42} width={44} />
                  </Box>
                </GridItem>
                <GridItem mb={files?.length ? 4 : 0} display='flex' alignItems='center'>
                  <PageText
                    as='small'
                    fontSize='helpText'
                    color='brand.helpText'
                    lineHeight='17px'
                    display='inline-block'
                  >
                    Click here or drag {multiple ? 'files' : 'a file'} into this box.
                  </PageText>
                </GridItem>
                <GridItem colStart={2}>
                  <Flex flexWrap='wrap' gap={2}>
                    {files?.map(file => (
                      <Flex
                        key={file.name}
                        display='inline-flex'
                        alignItems='center'
                        justifyContent='space-between'
                        bg='brand.upload.filename'
                        minW='175px'
                        pl={4}
                        py={2}
                        borderRadius='5px'
                      >
                        <PageText mr={2}>{file.name}</PageText>
                        <Flex
                          role='button'
                          onClick={e => {
                            e.stopPropagation();
                            removeFile(file);
                          }}
                          px={3}
                        >
                          <RemoveIcon />
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                </GridItem>
              </Grid>
            </Box>
          </InputGroup>
        </Field>
      )}
    />
  );
};
