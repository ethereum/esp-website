import { Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';

import { PageText, StepArrow, StepHeader } from '../';

interface Props {
  title: string;
  withArrow?: boolean;
}

export const ProcessStep: FC<Props> = ({ title, withArrow, children }) => {
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '203px 1fr' }}>
      <GridItem alignSelf='center'>
        <StepHeader>{title}</StepHeader>
      </GridItem>
      <GridItem alignSelf='center'>
        <PageText pl={{ md: 12 }}>{children}</PageText>
      </GridItem>
      {withArrow && <GridItem justifySelf='center'>{<StepArrow />}</GridItem>}
    </Grid>
  );
};
