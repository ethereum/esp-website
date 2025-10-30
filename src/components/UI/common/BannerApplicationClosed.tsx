import { FC } from 'react';
import { ChakraProps, Heading, Text, Link } from '@chakra-ui/react';

import { Banner } from './Banner';

import { APPLICANTS_URL } from '../../../constants';

interface Props extends ChakraProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  hideDescription?: boolean;
}

export const BannerApplicationClosed: FC<Props> = ({ children, title, description, hideDescription, ...props }) => {
  return (
    <Banner
      bgGradient='linear(to-br, brand.closedBanner.bgGradient.start 10%, brand.closedBanner.bgGradient.end 100%)'
      color='brand.heading'
      py={6}
      borderRadius='xl'
      flexDirection='column'
      textAlign='center'
      gap={2}
      {...props}
    >
      <Heading fontSize='h4' fontWeight={700}>
        {title || 'Applications for this grant wave are closed.'}
      </Heading>

      <Text fontSize='paragraph' fontWeight={300}>
        {!hideDescription && (description || (
          <>
            If you&apos;re still interested in pursuing grants for a project, you can still go
            through our{' '}
            <Link
              fontWeight={700}
              href={APPLICANTS_URL}
              color='brand.heading'
              textDecoration='underline'
            >
              standard applications
            </Link>
            .
          </>
        ))}
      </Text>

      {children}
    </Banner>
  );
};
