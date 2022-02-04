import { Link } from '@chakra-ui/react';
import { PageText } from '../UI';

export const GrantsListTheme = {
  p: ({ children }: any) => {
    return (
      <PageText as='span'>
        <strong>{children}</strong>
      </PageText>
    );
  },
  a: ({ children, href }: any) => {
    return (
      <Link textDecoration='underline' href={href}>
        {children}
      </Link>
    );
  }
};
