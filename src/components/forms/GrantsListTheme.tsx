import { Link } from '@chakra-ui/react';
import { PageText } from '../UI';

export const GrantsListTitleTheme = {
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

export const GrantsListDescriptionTheme = {
  p: ({ children }: any) => {
    return <PageText as='span'>{children}</PageText>;
  },
  a: ({ children, href }: any) => {
    return (
      <Link textDecoration='underline' href={href}>
        {children}
      </Link>
    );
  }
};
