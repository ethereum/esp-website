import {
  Box,
  Button,
  Flex,
  Grid,
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

const TABLE_COLUMNS: { key: keyof GrantRecord; label: string }[] = [
  { key: 'projectName', label: 'Project Name' },
  { key: 'domain', label: 'Domain' },
  { key: 'output', label: 'Output' },
  { key: 'fiscalQuarter', label: 'Date' },
];

const SortIcon: FC<{
  column: keyof GrantRecord;
  sortColumn: keyof GrantRecord | null;
  sortDirection: 'asc' | 'desc';
}> = ({ column, sortColumn, sortDirection }) => {
  if (sortColumn !== column) return null;
  return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
};

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

export interface GrantRoundOption {
  name: string;
  description: string | null;
}

interface RoundsFilterMenuProps {
  value: string | null;
  options: GrantRoundOption[];
  onChange: (value: string | null) => void;
}

const RoundsFilterMenu: FC<RoundsFilterMenuProps> = ({ value, options, onChange }) => (
  <Menu>
    <MenuButton as={Button} variant='outline' size='sm' minW='140px'>
      <Flex gap={2} alignItems='center' justifyContent='space-between'>
        <Text noOfLines={1}>{value || 'All Rounds'}</Text>
        <SelectArrowIcon />
      </Flex>
    </MenuButton>
    <MenuList maxH='400px' overflowY='auto' maxW={{ base: 'calc(100vw - 40px)', md: '400px' }}>
      <MenuItem onClick={() => onChange(null)} fontWeight={!value ? 'bold' : 'normal'}>
        All Rounds
      </MenuItem>
      {options.map(({ name, description }) => (
        <MenuItem
          key={name}
          onClick={() => onChange(name)}
          py={description ? 2 : undefined}
        >
          <Box>
            <Text fontWeight={value === name ? 'bold' : 'normal'}>{name}</Text>
            {description && (
              <Text fontSize='xs' color='brand.helpText' mt={0.5} whiteSpace='normal'>
                {description}
              </Text>
            )}
          </Box>
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export interface FilterState {
  searchQuery: string;
  domain: string | null;
  output: string | null;
  grantRound: string | null;
  year: string | null;
  quarter: string | null;
}

export interface FilterOptions {
  domains: string[];
  outputs: string[];
  grantRounds: GrantRoundOption[];
  years: string[];
  quarters: string[];
}

interface GrantsTableProps {
  grants: GrantRecord[];
  filters: FilterState;
  filterOptions: FilterOptions;
  onFilterChange: (key: keyof FilterState, value: string | null) => void;
  onGrantClick: (grant: GrantRecord) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const GrantsTable: FC<GrantsTableProps> = ({
  grants,
  filters,
  filterOptions,
  onFilterChange,
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
        alignItems={{ base: 'stretch', md: 'start' }}
      >
        <InputGroup maxW={{ md: '320px' }} >
          <InputLeftElement pointerEvents='none'>
            <Search size={18} color='#7c7ba1' />
          </InputLeftElement>
          <Input
            placeholder='Search projects...'
            value={filters.searchQuery}
            onChange={e => onFilterChange('searchQuery', e.target.value)}
            borderColor='brand.border'
            _focus={{ borderColor: 'brand.heading', boxShadow: 'none' }}
          />
        </InputGroup>

        <Box display={{ base: 'grid', md: 'flex' }} gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'none' }} gap={2} flexWrap='wrap'>
          <FilterMenu
            label='All Domains'
            value={filters.domain}
            options={filterOptions.domains}
            onChange={v => onFilterChange('domain', v)}
            maxH='300px'
          />
          <FilterMenu
            label='All Outputs'
            value={filters.output}
            options={filterOptions.outputs}
            onChange={v => onFilterChange('output', v)}
          />
          <RoundsFilterMenu
            value={filters.grantRound}
            options={filterOptions.grantRounds}
            onChange={v => onFilterChange('grantRound', v)}
          />
          <FilterMenu
            label='All Years'
            value={filters.year}
            options={filterOptions.years}
            onChange={v => onFilterChange('year', v)}
            minW='100px'
          />
          <FilterMenu
            label='All Quarters'
            value={filters.quarter}
            options={filterOptions.quarters}
            onChange={v => onFilterChange('quarter', v)}
            minW='120px'
            maxH='300px'
          />
        </Box>
      </Flex>

      <Text fontSize='sm' color='brand.helpText'>
        Showing {grants.length === 0 ? 0 : startIndex + 1}-{endIndex} of {grants.length.toLocaleString()} projects
      </Text>

      <Box overflowX='auto' border='1px solid' borderColor='brand.divider.100' borderRadius='lg'>
        <Table variant='simple' sx={{ tableLayout: 'fixed', minWidth: '640px' }}>
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '16%' }} />
          </colgroup>
          <Thead bg='gray.50'>
            <Tr>
              {TABLE_COLUMNS.map(({ key, label }) => (
                <Th
                  key={key}
                  color='brand.paragraph'
                  fontWeight='600'
                  cursor='pointer'
                  onClick={() => handleSort(key)}
                  _hover={{ color: 'brand.heading' }}
                >
                  <Flex align='center' gap={1}>
                    {label}
                    <SortIcon column={key} sortColumn={sortColumn} sortDirection={sortDirection} />
                  </Flex>
                </Th>
              ))}
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
                      color={grant.domain ? 'brand.heading' : 'brand.helpText'}
                      fontSize='sm'
                      cursor={grant.domain ? 'pointer' : 'default'}
                      _hover={grant.domain ? { textDecoration: 'underline' } : {}}
                      onClick={e => {
                        if (grant.domain) {
                          e.stopPropagation();
                          onFilterChange('domain', grant.domain);
                        }
                      }}
                    >
                      {grant.domain || '-'}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      color={grant.output ? 'brand.heading' : 'brand.helpText'}
                      fontSize='sm'
                      cursor={grant.output ? 'pointer' : 'default'}
                      _hover={grant.output ? { textDecoration: 'underline' } : {}}
                      onClick={e => {
                        if (grant.output) {
                          e.stopPropagation();
                          onFilterChange('output', grant.output);
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
