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

/**
 * Grant round descriptions for the filter dropdown.
 * Keys can be exact matches or pattern prefixes (checked with startsWith).
 */
const GRANT_ROUND_DESCRIPTIONS: Record<string, string> = {
  '10 Years of Ethereum Meet Ups': 'Community events celebrating Ethereum\'s 10th anniversary.',
  '4844 Data Challenge': 'Projects exploring blob data and EIP-4844 use cases.',
  'Academic Grants Round': 'Funding for academic research advancing Ethereum protocol, cryptography, and ecosystem understanding.',
  'Data Collection': 'Projects gathering and analyzing Ethereum network data and metrics.',
  'Destino Devconnect': 'Travel support for builders attending Devconnect.',
  'Devcon SEA Dashboard Quadratic Voting': 'Community voting initiative for Devcon Southeast Asia.',
  'ETHRangers': 'Program supporting Ethereum ecosystem contributors.',
  'EcoDev Research Fellowship': 'Fellowship for ecosystem development research.',
  'Ethereum Protocol Fellowship': 'Cohort-based program for aspiring core protocol contributors.',
  'Next Billion Fellowship': 'Supporting builders focused on onboarding the next billion users.',
  'PSE Core Program': 'Privacy & Scaling Explorations team core grants.',
  'Pectra': 'Projects related to the Pectra network upgrade.',
  'Poseidon Initiative': 'Grants advancing the Poseidon hash function and related cryptography.',
  'Road to Devcon': 'Supporting community initiatives leading up to Devcon.',
  'Season of Internships': 'Internship program for emerging Ethereum developers.',
  'Summer of Protocols': 'Research program exploring protocol design and governance.',
  'Women in Ethereum Protocol': 'Supporting women contributors to Ethereum core development.',
  'ZK Grant Round': 'Funding for zero-knowledge proof research and tooling.'
};

/**
 * Get description for a grant round by matching exact name or prefix pattern.
 */
function getRoundDescription(roundName: string): string | null {
  // Check exact match first
  if (GRANT_ROUND_DESCRIPTIONS[roundName]) {
    return GRANT_ROUND_DESCRIPTIONS[roundName];
  }
  // Check prefix patterns (e.g., "Academic Grants Round 2024" matches "Academic Grants Round")
  for (const [pattern, description] of Object.entries(GRANT_ROUND_DESCRIPTIONS)) {
    if (roundName.startsWith(pattern)) {
      return description;
    }
  }
  return null;
}

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

interface RoundsFilterMenuProps {
  value: string | null;
  options: string[];
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
      {options.map(option => {
        const description = getRoundDescription(option);
        return (
          <MenuItem
            key={option}
            onClick={() => onChange(option)}
            py={description ? 2 : undefined}
          >
            <Box>
              <Text fontWeight={value === option ? 'bold' : 'normal'}>{option}</Text>
              {description && (
                <Text fontSize='xs' color='brand.helpText' mt={0.5} whiteSpace='normal'>
                  {description}
                </Text>
              )}
            </Box>
          </MenuItem>
        );
      })}
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
  grantRoundFilter: string | null;
  onGrantRoundFilterChange: (round: string | null) => void;
  grantRoundOptions: string[];
  yearFilter: string | null;
  onYearFilterChange: (year: string | null) => void;
  yearOptions: string[];
  quarterFilter: string | null;
  onQuarterFilterChange: (quarter: string | null) => void;
  quarterOptions: string[];
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
  grantRoundFilter,
  onGrantRoundFilterChange,
  grantRoundOptions,
  yearFilter,
  onYearFilterChange,
  yearOptions,
  quarterFilter,
  onQuarterFilterChange,
  quarterOptions,
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
        alignItems={{ base: 'stretch', md: 'start' }}
      >
        <InputGroup maxW={{ md: '320px' }} >
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

        <Box display={{ base: 'grid', md: 'flex' }} gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'none' }} gap={2} flexWrap='wrap'>
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
          <RoundsFilterMenu
            value={grantRoundFilter}
            options={grantRoundOptions}
            onChange={onGrantRoundFilterChange}
          />
          <FilterMenu
            label='All Years'
            value={yearFilter}
            options={yearOptions}
            onChange={onYearFilterChange}
            minW='100px'
          />
          <FilterMenu
            label='All Quarters'
            value={quarterFilter}
            options={quarterOptions}
            onChange={onQuarterFilterChange}
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
                      color={grant.domain ? 'brand.heading' : 'brand.helpText'}
                      fontSize='sm'
                      cursor={grant.domain ? 'pointer' : 'default'}
                      _hover={grant.domain ? { textDecoration: 'underline' } : {}}
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
                      color={grant.output ? 'brand.heading' : 'brand.helpText'}
                      fontSize='sm'
                      cursor={grant.output ? 'pointer' : 'default'}
                      _hover={grant.output ? { textDecoration: 'underline' } : {}}
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
