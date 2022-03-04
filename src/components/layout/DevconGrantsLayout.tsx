import { Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { AcademicGrantsHero } from '../UI';

export const DevconGrantsLayout: FC = ({ children }) => {
  return (
    <Stack>
      <AcademicGrantsHero title='Devcon Grants Round'>
        {/* TODO: update copy */}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ut, necessitatibus, quidem
        autem nam vitae quod, omnis repellat error est impedit iste delectus beatae voluptatem
        accusamus explicabo magnam? Et, similique?
      </AcademicGrantsHero>

      <Stack>{children}</Stack>
    </Stack>
  );
};
