import {
  Box,
  Flex,
  IconButton,
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
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Search } from 'lucide-react';
import { FC, useMemo, useRef, useState } from 'react';

import { GrantRecord, PrivateGrantRecord } from '../../types/grants';
import { SelectArrowIcon } from '../UI/icons';

const Button = chakra('button');

const PAGE_SIZE = 15;

interface GrantsTableProps {
  grants: GrantRecord[] | PrivateGrantRecord[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  domainFilter: string | null;
  onDomainFilterChange: (domain: string | null) => void;
  domainOptions: string[];
  outputFilter: string | null;
  onOutputFilterChange: (output: string | null) => void;
  outputOptions: string[];
  yearFilter: string | null;
  onYearFilterChange: (year: string | null) => void;
  yearOptions: string[];
  onGrantClick: (grant: GrantRecord | PrivateGrantRecord) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  showPrivateFields?: boolean;
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
  yearFilter,
  onYearFilterChange,
  yearOptions,
  onGrantClick,
  currentPage,
  onPageChange,
  showPrivateFields = false
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [sortColumn, setSortColumn] = useState<keyof GrantRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sort grants
  const sortedGrants = useMemo(() => {
    if (!sortColumn) return grants;

    return [...grants].sort((a, b) => {
      const aVal = a[sortColumn] ?? '';
      const bVal = b[sortColumn] ?? '';

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [grants, sortColumn, sortDirection]);

  const handleSort = (column: keyof GrantRecord) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        // Third click clears sort
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    onPageChange(1); // Reset to first page on sort
  };

  const SortIcon = ({ column }: { column: keyof GrantRecord }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedGrants.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, sortedGrants.length);
  const paginatedGrants = sortedGrants.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Stack spacing={4} ref={tableRef}>
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

          <Menu>
            <MenuButton as={Button} minW='100px'>
              <Flex gap={2} alignItems='center' justifyContent='space-between'>
                <Text noOfLines={1}>{yearFilter || 'All Years'}</Text>
                <SelectArrowIcon />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onYearFilterChange(null)} fontWeight={!yearFilter ? 'bold' : 'normal'}>
                All Years
              </MenuItem>
              {yearOptions.map(year => (
                <MenuItem
                  key={year}
                  onClick={() => onYearFilterChange(year)}
                  fontWeight={yearFilter === year ? 'bold' : 'normal'}
                >
                  {year}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Text fontSize='sm' color='brand.helpText'>
        Showing {grants.length === 0 ? 0 : startIndex + 1}-{endIndex} of {grants.length.toLocaleString()} projects
      </Text>

      <Box overflowX='auto' border='1px solid' borderColor='brand.divider.100' borderRadius='lg'>
        <Table variant='simple' sx={{ tableLayout: 'fixed' }}>
          <colgroup>
            {showPrivateFields ? (
              <>
                <col style={{ width: '25%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '9%' }} />
              </>
            ) : (
              <>
                <col style={{ width: '45%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '15%' }} />
              </>
            )}
          </colgroup>
          <Thead bg='gray.50'>
            <Tr>
              <Th
                color='brand.paragraph'
                fontWeight='600'
                cursor='pointer'
                onClick={() => handleSort('projectName')}
                _hover={{ color: 'brand.heading' }}
              >
                <Flex align='center' gap={1}>
                  Project Name
                  <SortIcon column='projectName' />
                </Flex>
              </Th>
              <Th
                color='brand.paragraph'
                fontWeight='600'
                cursor='pointer'
                onClick={() => handleSort('domain')}
                _hover={{ color: 'brand.heading' }}
              >
                <Flex align='center' gap={1}>
                  Domain
                  <SortIcon column='domain' />
                </Flex>
              </Th>
              <Th
                color='brand.paragraph'
                fontWeight='600'
                cursor='pointer'
                onClick={() => handleSort('output')}
                _hover={{ color: 'brand.heading' }}
              >
                <Flex align='center' gap={1}>
                  Output
                  <SortIcon column='output' />
                </Flex>
              </Th>
              <Th
                color='brand.paragraph'
                fontWeight='600'
                cursor='pointer'
                onClick={() => handleSort('fiscalQuarter')}
                _hover={{ color: 'brand.heading' }}
              >
                <Flex align='center' gap={1}>
                  Date
                  <SortIcon column='fiscalQuarter' />
                </Flex>
              </Th>
              {showPrivateFields && (
                <>
                  <Th color='brand.paragraph' fontWeight='600'>
                    Cost Center
                  </Th>
                  <Th color='brand.paragraph' fontWeight='600'>
                    Evaluator
                  </Th>
                  <Th color='brand.paragraph' fontWeight='600' isNumeric>
                    Budget
                  </Th>
                  <Th color='brand.paragraph' fontWeight='600'>
                    Status
                  </Th>
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {paginatedGrants.length === 0 ? (
              <Tr>
                <Td colSpan={showPrivateFields ? 8 : 4} textAlign='center' py={8}>
                  <Text color='brand.helpText'>No projects found matching your criteria</Text>
                </Td>
              </Tr>
            ) : (
              paginatedGrants.map(grant => (
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
                    <Text
                      color='brand.helpText'
                      fontSize='sm'
                      cursor={grant.domain ? 'pointer' : 'default'}
                      _hover={grant.domain ? { color: 'brand.heading' } : {}}
                      onClick={e => {
                        if (grant.domain) {
                          e.stopPropagation();
                          onDomainFilterChange(grant.domain);
                        }
                      }}
                    >
                      {grant.domain || '-'}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      color='brand.helpText'
                      fontSize='sm'
                      cursor={grant.output ? 'pointer' : 'default'}
                      _hover={grant.output ? { color: 'brand.heading' } : {}}
                      onClick={e => {
                        if (grant.output) {
                          e.stopPropagation();
                          onOutputFilterChange(grant.output);
                        }
                      }}
                    >
                      {grant.output || '-'}
                    </Text>
                  </Td>
                  <Td>
                    <Text color='brand.helpText' fontSize='sm' whiteSpace='nowrap'>
                      {grant.fiscalQuarter}
                    </Text>
                  </Td>
                  {showPrivateFields && (
                    <>
                      <Td>
                        <Text color='brand.helpText' fontSize='sm' noOfLines={1}>
                          {(grant as PrivateGrantRecord).costCenter || '-'}
                        </Text>
                      </Td>
                      <Td>
                        <Text color='brand.helpText' fontSize='sm' noOfLines={1}>
                          {(grant as PrivateGrantRecord).grantEvaluator || '-'}
                        </Text>
                      </Td>
                      <Td isNumeric>
                        <Text color='brand.helpText' fontSize='sm'>
                          {(grant as PrivateGrantRecord).budgetAmount
                            ? `$${(grant as PrivateGrantRecord).budgetAmount!.toLocaleString()}`
                            : '-'}
                        </Text>
                      </Td>
                      <Td>
                        <Text color='brand.helpText' fontSize='sm' noOfLines={1}>
                          {(grant as PrivateGrantRecord).status || '-'}
                        </Text>
                      </Td>
                    </>
                  )}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination controls - only show if more than one page */}
      {totalPages > 1 && (
        <Flex
          as='nav'
          aria-label='Grants pagination'
          justify='center'
          align='center'
          gap={4}
          pt={2}
        >
          <IconButton
            aria-label='Previous page'
            icon={<ChevronLeft size={18} />}
            size='sm'
            variant='outline'
            onClick={() => handlePageChange(safePage - 1)}
            isDisabled={safePage === 1}
          />
          <Text fontSize='sm' color='brand.paragraph'>
            Page {safePage} of {totalPages}
          </Text>
          <IconButton
            aria-label='Next page'
            icon={<ChevronRight size={18} />}
            size='sm'
            variant='outline'
            onClick={() => handlePageChange(safePage + 1)}
            isDisabled={safePage === totalPages}
          />
        </Flex>
      )}
    </Stack>
  );
};
