import { ListProps, OrderedList as List } from '@chakra-ui/react';
import { FC } from 'react';

export const OrderedList: FC<ListProps> = ({ children }) => {
  return (
    <List
      color='brand.paragraph'
      fontSize='paragraph'
      fontWeight={300}
      lineHeight='24px'
      spacing={1}
      ml={6}
    >
      {children}
    </List>
  );
};
