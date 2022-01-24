import { Center, Heading, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { ButtonLink } from '../components';

interface Props {
  link: string;
}

export const ReadyToApply: FC<Props> = ({ link }) => {
  return (
    <Stack
      borderRadius='10px'
      bgGradient='linear(to-b, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
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
          Ready to apply?
        </Heading>
      </Stack>

      <Center>
        <ButtonLink label='Apply' link={link} width='208px' isApplyButton />
      </Center>
    </Stack>
  );
};
