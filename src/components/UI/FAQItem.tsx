import { AccordionButton, AccordionItem, AccordionPanel, Box, Stack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { MinusIcon, PlusIcon } from '../../components/UI/icons';
import { FAQQuestion } from './headings';

interface Props {
  question: string;
  children: ReactNode;
}

export const FAQItem: FC<Props> = ({ question, children }) => {
  return (
    <AccordionItem
      id={question}
      py={2}
      maxW='100%'
      borderRadius='10px'
      border='none'
      bgGradient='linear(to-br, brand.faq.bgGradient.start 10%, brand.faq.bgGradient.end 100%)'
      mb='10px'
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton>
            {isExpanded ? (
              <MinusIcon color='brand.orange.200' w={5} h={5} />
            ) : (
              <PlusIcon fill='brand.orange.200' w={5} h={5} />
            )}
            <Box flex='1' pl='13px'>
              <FAQQuestion>{question}</FAQQuestion>
            </Box>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack ml={8}>{children}</Stack>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};
