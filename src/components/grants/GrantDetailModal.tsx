import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Tooltip
} from '@chakra-ui/react';
import { Github, Mail, MessageCircle, Twitter } from 'lucide-react';
import { FC } from 'react';

import { GrantRecord } from '../../types/grants';

interface GrantDetailModalProps {
  grant: GrantRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GrantDetailModal: FC<GrantDetailModalProps> = ({ grant, isOpen, onClose }) => {
  if (!grant) return null;

  const activatedDate = new Date(grant.activatedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  const hasContacts = grant.email || grant.telegram || grant.twitter || grant.projectRepo;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(2px)' />
      <ModalContent mx={4}>
        <ModalCloseButton />
        <ModalBody pb={8} px={6} pt={10}>
          <Stack spacing={6}>
            <Box>
              <Heading size='md' color='brand.heading' mb={2}>
                {grant.projectName}
              </Heading>
              <Divider borderColor='brand.divider.100' />
            </Box>

            {grant.description && (
              <Text color='brand.paragraph' fontSize='sm' lineHeight='tall'>
                {grant.description}
              </Text>
            )}

            <Stack spacing={3}>
              <Flex gap={4}>
                <Text fontWeight='500' color='brand.helpText' minW='80px' fontSize='sm'>
                  Domain
                </Text>
                <Text color='brand.paragraph' fontSize='sm'>
                  {grant.domain || '-'}
                </Text>
              </Flex>

              <Flex gap={4}>
                <Text fontWeight='500' color='brand.helpText' minW='80px' fontSize='sm'>
                  Output
                </Text>
                <Text color='brand.paragraph' fontSize='sm'>
                  {grant.output || '-'}
                </Text>
              </Flex>

              {grant.grantRound && (
                <Flex gap={4}>
                  <Text fontWeight='500' color='brand.helpText' minW='80px' fontSize='sm'>
                    Round
                  </Text>
                  <Box>
                    <Text color='brand.paragraph' fontSize='sm'>
                      {grant.grantRound}
                    </Text>
                    {grant.grantRoundDescription && (
                      <Text color='brand.helpText' fontSize='xs' mt={1}>
                        {grant.grantRoundDescription}
                      </Text>
                    )}
                  </Box>
                </Flex>
              )}

              <Flex gap={4}>
                <Text fontWeight='500' color='brand.helpText' minW='80px' fontSize='sm'>
                  Date
                </Text>
                <Text color='brand.paragraph' fontSize='sm'>
                  {activatedDate}
                </Text>
              </Flex>
            </Stack>

            {hasContacts && (
              <HStack spacing={2} pt={2}>
                {grant.projectRepo && (
                  <Tooltip label='GitHub' hasArrow>
                    <IconButton
                      as={Link}
                      href={grant.projectRepo}
                      isExternal
                      aria-label='GitHub repository'
                      size='sm'
                      variant='outline'
                      borderColor='brand.heading'
                      color='brand.heading'
                      icon={<Github size={16} />}
                      _hover={{ bg: 'orange.50', textDecoration: 'none' }}
                    />
                  </Tooltip>
                )}

                {grant.email && (
                  <Tooltip label='Email' hasArrow>
                    <IconButton
                      as={Link}
                      href={`mailto:${grant.email}`}
                      aria-label='Email contact'
                      size='sm'
                      variant='outline'
                      borderColor='brand.heading'
                      color='brand.heading'
                      icon={<Mail size={16} />}
                      _hover={{ bg: 'orange.50', textDecoration: 'none' }}
                    />
                  </Tooltip>
                )}

                {grant.telegram && (
                  <Tooltip label='Telegram' hasArrow>
                    <IconButton
                      as={Link}
                      href={`https://t.me/${grant.telegram}`}
                      isExternal
                      aria-label='Telegram contact'
                      size='sm'
                      variant='outline'
                      borderColor='brand.heading'
                      color='brand.heading'
                      icon={<MessageCircle size={16} />}
                      _hover={{ bg: 'orange.50', textDecoration: 'none' }}
                    />
                  </Tooltip>
                )}

                {grant.twitter && (
                  <Tooltip label='X (Twitter)' hasArrow>
                    <IconButton
                      as={Link}
                      href={`https://x.com/${grant.twitter}`}
                      isExternal
                      aria-label='X (Twitter) profile'
                      size='sm'
                      variant='outline'
                      borderColor='brand.heading'
                      color='brand.heading'
                      icon={<Twitter size={16} />}
                      _hover={{ bg: 'orange.50', textDecoration: 'none' }}
                    />
                  </Tooltip>
                )}
              </HStack>
            )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
