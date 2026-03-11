import { Stack, useDisclosure } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { FilterState, GrantRecord } from '../../types/grants';
import { GrantsTable } from './GrantsTable';
import { GrantDetailModal } from './GrantDetailModal';

interface GrantsExplorerProps {
  grants: GrantRecord[];
  grantRoundDescriptions: Record<string, string>;
}

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  domain: null,
  output: null,
  grantRound: null,
  year: null,
  quarter: null,
};

export const GrantsExplorer: FC<GrantsExplorerProps> = ({ grants, grantRoundDescriptions }) => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedGrant, setSelectedGrant] = useState<GrantRecord | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleFilterChange = useCallback((key: keyof FilterState, value: string | null) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'searchQuery') {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => setDebouncedSearch(value ?? ''), 250);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filters.domain, filters.output, filters.grantRound, filters.year, filters.quarter]);

  const filterOptions = useMemo(() => {
    const domains = Array.from(new Set(grants.map(g => g.domain).filter((d): d is string => d !== null)));
    if (!domains.includes('Other')) domains.push('Other');

    const roundNames = Array.from(new Set(grants.map(g => g.grantRound).filter((r): r is string => r !== null)));

    return {
      domains: domains.sort(),
      outputs: Array.from(new Set(grants.map(g => g.output).filter((o): o is string => o !== null))).sort(),
      grantRounds: roundNames
        .map(name => ({ name, description: grantRoundDescriptions[name] ?? null }))
        .sort((a, b) => a.name.localeCompare(b.name)),
      years: Array.from(new Set(grants.map(g => g.fiscalQuarter.split(' ')[0]))).sort().reverse(),
      quarters: Array.from(new Set(grants.map(g => g.fiscalQuarter))).sort().reverse(),
    };
  }, [grants, grantRoundDescriptions]);

  // Pre-compute lowercase fields once to avoid repeated allocations during search
  const searchableGrants = useMemo(
    () => grants.map(g => ({ ...g, _searchName: g.projectName.toLowerCase(), _searchDesc: g.description?.toLowerCase() ?? '' })),
    [grants]
  );

  const filteredGrants = useMemo(() => {
    const lowerQuery = debouncedSearch.toLowerCase();
    return searchableGrants.filter(grant => {
      const matchesSearch =
        debouncedSearch === '' ||
        grant._searchName.includes(lowerQuery) ||
        grant._searchDesc.includes(lowerQuery);

      const matchesDomain = filters.domain === null || grant.domain === filters.domain;
      const matchesOutput = filters.output === null || grant.output === filters.output;
      const matchesGrantRound = filters.grantRound === null || grant.grantRound === filters.grantRound;
      const matchesYear = filters.year === null || grant.fiscalQuarter.startsWith(filters.year);
      const matchesQuarter = filters.quarter === null || grant.fiscalQuarter === filters.quarter;

      return matchesSearch && matchesDomain && matchesOutput && matchesGrantRound && matchesYear && matchesQuarter;
    });
  }, [searchableGrants, debouncedSearch, filters.domain, filters.output, filters.grantRound, filters.year, filters.quarter]);

  const handleGrantClick = (grant: GrantRecord) => {
    setSelectedGrant(grant);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedGrant(null);
    onClose();
  };

  return (
    <Stack spacing={10}>
      <GrantsTable
          grants={filteredGrants}
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onGrantClick={handleGrantClick}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
      />

      <GrantDetailModal grant={selectedGrant} grantRoundDescriptions={grantRoundDescriptions} isOpen={isOpen} onClose={handleCloseModal} />
    </Stack>
  );
};
