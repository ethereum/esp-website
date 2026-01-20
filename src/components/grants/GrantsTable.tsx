import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  chakra
} from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { FC } from 'react';

import { GrantRecord } from '../../types/grants';
import { SelectArrowIcon } from '../UI/icons';

const Button = chakra('button');

interface GrantsTableProps {
  grants: GrantRecord[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  domainFilter: string | null;
  onDomainFilterChange: (domain: string | null) => void;
  domainOptions: string[];
  outputFilter: string | null;
  onOutputFilterChange: (output: string | null) => void;
  outputOptions: string[];
  onGrantClick: (grant: GrantRecord) => void;
}

export const GrantsTable: FC<GrantsTableProps> = ({
  grants,
  searchQuery,
  onSearchChange,
  domainFilter,
  onDomainFilterChange,
  domainOptions,
  outputFilter,
  onOutputFilterChange,
  outputOptions,
  onGrantClick
}) => {
  return (
    <Stack spacing={4}>
      <Flex
        gap={4}
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
        alignItems={{ base: 'stretch', md: 'center' }}
      >
        <InputGroup maxW={{ md: '320px' }}>
          <InputLeftElement pointerEvents='none'>
            <Search size={18} color='#7c7ba1' />
          </InputLeftElement>
          <Input
            placeholder='Search projects...'
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            borderColor='brand.border'
            _focus={{ borderColor: 'brand.heading', boxShadow: 'none' }}
          />
        </InputGroup>

        <Flex gap={2}>
          <Menu>
            <MenuButton as={Button} minW='140px'>
              <Flex gap={2} alignItems='center' justifyContent='space-between'>
                <Text noOfLines={1}>{domainFilter || 'All Domains'}</Text>
                <SelectArrowIcon />
              </Flex>
            </MenuButton>
            <MenuList maxH='300px' overflowY='auto'>
              <MenuItem onClick={() => onDomainFilterChange(null)} fontWeight={!domainFilter ? 'bold' : 'normal'}>
                All Domains
              </MenuItem>
              {domainOptions.map(domain => (
                <MenuItem
                  key={domain}
                  onClick={() => onDomainFilterChange(domain)}
                  fontWeight={domainFilter === domain ? 'bold' : 'normal'}
                >
                  {domain}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} minW='140px'>
              <Flex gap={2} alignItems='center' justifyContent='space-between'>
                <Text noOfLines={1}>{outputFilter || 'All Outputs'}</Text>
                <SelectArrowIcon />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onOutputFilterChange(null)} fontWeight={!outputFilter ? 'bold' : 'normal'}>
                All Outputs
              </MenuItem>
              {outputOptions.map(output => (
                <MenuItem
                  key={output}
                  onClick={() => onOutputFilterChange(output)}
                  fontWeight={outputFilter === output ? 'bold' : 'normal'}
                >
                  {output}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Text fontSize='sm' color='brand.helpText'>
        Showing {grants.length.toLocaleString()} projects
      </Text>

      <Box overflowX='auto' border='1px solid' borderColor='brand.divider.100' borderRadius='lg'>
        <Table variant='simple'>
          <Thead bg='gray.50'>
            <Tr>
              <Th color='brand.paragraph' fontWeight='600'>
                Project Name
              </Th>
              <Th color='brand.paragraph' fontWeight='600'>
                Domain
              </Th>
              <Th color='brand.paragraph' fontWeight='600'>
                Output
              </Th>
              <Th color='brand.paragraph' fontWeight='600'>
                FQ
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {grants.length === 0 ? (
              <Tr>
                <Td colSpan={4} textAlign='center' py={8}>
                  <Text color='brand.helpText'>No projects found matching your criteria</Text>
                </Td>
              </Tr>
            ) : (
              grants.map(grant => (
                <Tr
                  key={grant.id}
                  onClick={() => onGrantClick(grant)}
                  cursor='pointer'
                  _hover={{ bg: 'orange.50' }}
                  transition='background 0.15s'
                >
                  <Td>
                    <Text fontWeight='500' color='brand.paragraph' noOfLines={1}>
                      {grant.projectName}
                    </Text>
                  </Td>
                  <Td>
                    <Text color='brand.helpText' fontSize='sm'>
                      {grant.domain || '-'}
                    </Text>
                  </Td>
                  <Td>
                    <Text color='brand.helpText' fontSize='sm'>
                      {grant.output || '-'}
                    </Text>
                  </Td>
                  <Td>
                    <Text color='brand.helpText' fontSize='sm' whiteSpace='nowrap'>
                      {grant.fiscalQuarter}
                    </Text>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </Stack>
  );
};
