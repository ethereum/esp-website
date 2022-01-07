import { Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { ApplicantsDescription, ReadyToApply } from '../UI/common';

interface Props {
  linkToApply: string;
}

export const ApplicantsLayout: FC<Props> = ({ children, linkToApply }) => {
  return (
    <main>
      <Stack mb={32}>
        <section id='hero'>
          <ApplicantsDescription />
        </section>
      </Stack>

      {children}

      <Stack>
        <section id='ready-to-apply'>
          <ReadyToApply link={linkToApply} />
        </section>
      </Stack>
    </main>
  );
};
