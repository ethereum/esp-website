import { AccordionButton, AccordionItem, AccordionPanel, Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';

import { MinusIcon, PlusIcon } from '../../components/UI/icons';
import { FAQQuestion } from './headings';

interface Props {
  question: string;
}

export const FAQItem: FC<Props> = ({ question, children }) => {
  return (
    <AccordionItem
      id={question}
      py={2}
      maxW='100%'
      borderRadius='10px'
      border='none'
      bgGradient='linear(to-r, brand.faq.bgGradient.start 10%, brand.faq.bgGradient.end 100%)'
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
            <Flex ml={8}>
              <Box mr={3}>
                <FAQQuestion>A.</FAQQuestion>
              </Box>
              <Box maxW='92%'>{children}</Box>
            </Flex>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};
