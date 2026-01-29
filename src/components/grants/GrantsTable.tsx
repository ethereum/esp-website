import {
  Box,
  Button,
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
  Tr
} from '@chakra-ui/react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Search } from 'lucide-react';
import { FC, useMemo, useRef, useState } from 'react';

import { GrantRecord } from '../../types/grants';
import { SelectArrowIcon } from '../UI/icons';

const PAGE_SIZE = 15;

interface FilterMenuProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (value: string | null) => void;
  minW?: string;
  maxH?: string;
}

const FilterMenu: FC<FilterMenuProps> = ({ label, value, options, onChange, minW = '140px', maxH }) => (
  <Menu>
    <MenuButton as={Button} variant='outline' size='sm' minW={minW}>
      <Flex gap={2} alignItems='center' justifyContent='space-between'>
        <Text noOfLines={1}>{value || label}</Text>
        <SelectArrowIcon />
      </Flex>
    </MenuButton>
    <MenuList maxH={maxH} overflowY={maxH ? 'auto' : undefined}>
      <MenuItem onClick={() => onChange(null)} fontWeight={!value ? 'bold' : 'normal'}>
        {label}
      </MenuItem>
      {options.map(option => (
        <MenuItem
          key={option}
          onClick={() => onChange(option)}
          fontWeight={value === option ? 'bold' : 'normal'}
        >
          {option}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

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
  yearFilter: string | null;
  onYearFilterChange: (year: string | null) => void;
  yearOptions: string[];
  onGrantClick: (grant: GrantRecord) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
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
  onPageChange
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
          <FilterMenu
            label='All Domains'
            value={domainFilter}
            options={domainOptions}
            onChange={onDomainFilterChange}
            maxH='300px'
          />
          <FilterMenu
            label='All Outputs'
            value={outputFilter}
            options={outputOptions}
            onChange={onOutputFilterChange}
          />
          <FilterMenu
            label='All Years'
            value={yearFilter}
            options={yearOptions}
            onChange={onYearFilterChange}
            minW='100px'
          />
        </Flex>
      </Flex>

      <Text fontSize='sm' color='brand.helpText'>
        Showing {grants.length === 0 ? 0 : startIndex + 1}-{endIndex} of {grants.length.toLocaleString()} projects
      </Text>

      <Box overflowX='auto' border='1px solid' borderColor='brand.divider.100' borderRadius='lg'>
        <Table variant='simple' sx={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '45%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '15%' }} />
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
            </Tr>
          </Thead>
          <Tbody>
            {paginatedGrants.length === 0 ? (
              <Tr>
                <Td colSpan={4} textAlign='center' py={8}>
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
