import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react';
import { ExternalLink, Github, Mail } from 'lucide-react';
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(2px)' />
      <ModalContent mx={4}>
        <ModalCloseButton />
        <ModalBody py={8} px={6}>
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

              <Flex gap={4}>
                <Text fontWeight='500' color='brand.helpText' minW='80px' fontSize='sm'>
                  Awarded
                </Text>
                <Text color='brand.paragraph' fontSize='sm'>
                  {activatedDate}
                </Text>
              </Flex>
            </Stack>

            <HStack spacing={3} pt={2}>
              {grant.projectRepo && (
                <Button
                  as={Link}
                  href={grant.projectRepo}
                  isExternal
                  size='sm'
                  variant='outline'
                  borderColor='brand.heading'
                  color='brand.heading'
                  leftIcon={<Github size={16} />}
                  _hover={{ bg: 'orange.50', textDecoration: 'none' }}
                >
                  GitHub
                </Button>
              )}

              {(() => {
                if (!grant.publicContact) return null;
                const isEmail = grant.publicContact.includes('@');
                return (
                  <Button
                    as={Link}
                    href={isEmail ? `mailto:${grant.publicContact}` : grant.publicContact}
                    isExternal={!isEmail}
                    size='sm'
                    variant='outline'
                    borderColor='brand.heading'
                    color='brand.heading'
                    leftIcon={isEmail ? <Mail size={16} /> : <ExternalLink size={16} />}
                    _hover={{ bg: 'orange.50', textDecoration: 'none' }}
                  >
                    Contact
                  </Button>
                );
              })()}
            </HStack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
