import { Center, Heading, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { ButtonLink } from '../..';

interface Props {
  buttonText?: string;
  buttonWidth?: string;
  ctaText?: string;
  isApplyButton?: boolean;
  link: string;
}

export const ReadyToApply: FC<Props> = ({
  buttonText='Apply',
  buttonWidth='208px',
  ctaText='Ready to apply?',
  isApplyButton=true,
  link
}) => {
  return (
    <Stack
      borderRadius='10px'
      bgGradient='linear(to-br, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
      h='150px'
      w='100%'
      justifyContent='center'
    >
      <Stack mb={2}>
        <Heading
          as='h4'
          color='brand.ready.text'
          fontSize='h4'
          fontWeight={700}
          lineHeight='22px'
          textAlign='center'
        >
          {ctaText}
        </Heading>
      </Stack>

      <Center>
        <ButtonLink
          isApplyButton={isApplyButton}
          label={buttonText}
          link={link}
          width={buttonWidth}
        />
      </Center>
    </Stack>
  );
};
