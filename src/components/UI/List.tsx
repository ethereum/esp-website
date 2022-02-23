import { ListProps, UnorderedList } from '@chakra-ui/react';
import { FC } from 'react';

export const List: FC<ListProps> = ({ children }) => {
  return (
    <UnorderedList
      color='brand.paragraph'
      fontSize='paragraph'
      fontWeight={300}
      lineHeight='24px'
      spacing={1}
      ml={6}
    >
      {children}
    </UnorderedList>
  );
};
