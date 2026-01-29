import { Box, Stack, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';

import { GrantRecord } from '../../types/grants';
import { GrantsDashboard } from './GrantsDashboard';
import { GrantsTable } from './GrantsTable';
import { GrantDetailModal } from './GrantDetailModal';

interface GrantsExplorerProps {
  grants: GrantRecord[];
}

export const GrantsExplorer: FC<GrantsExplorerProps> = ({ grants }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const [outputFilter, setOutputFilter] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [selectedGrant, setSelectedGrant] = useState<GrantRecord | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, domainFilter, outputFilter, yearFilter]);

  const domainOptions = useMemo(() => {
    const domains = Array.from(new Set(grants.map(g => g.domain).filter((d): d is string => d !== null)));
    // Ensure "Other" is always available
    if (!domains.includes('Other')) {
      domains.push('Other');
    }
    return domains.sort();
  }, [grants]);

  const outputOptions = useMemo(() => {
    return Array.from(new Set(grants.map(g => g.output).filter((o): o is string => o !== null))).sort();
  }, [grants]);

  const yearOptions = useMemo(() => {
    // Extract fiscal year from fiscalQuarter (e.g., "FY25 Q3" -> "FY25")
    return Array.from(new Set(grants.map(g => g.fiscalQuarter.split(' ')[0]))).sort().reverse();
  }, [grants]);

  const filteredGrants = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return grants.filter(grant => {
      const matchesSearch =
        searchQuery === '' ||
        grant.projectName.toLowerCase().includes(lowerQuery) ||
        grant.description?.toLowerCase().includes(lowerQuery);

      const matchesDomain = domainFilter === null || grant.domain === domainFilter;
      const matchesOutput = outputFilter === null || grant.output === outputFilter;
      const matchesYear = yearFilter === null || grant.fiscalQuarter.startsWith(yearFilter);

      return matchesSearch && matchesDomain && matchesOutput && matchesYear;
    });
  }, [grants, searchQuery, domainFilter, outputFilter, yearFilter]);

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
      <GrantsDashboard grants={grants} />

      <Box>
        <GrantsTable
          grants={filteredGrants}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          domainFilter={domainFilter}
          onDomainFilterChange={setDomainFilter}
          domainOptions={domainOptions}
          outputFilter={outputFilter}
          onOutputFilterChange={setOutputFilter}
          outputOptions={outputOptions}
          yearFilter={yearFilter}
          onYearFilterChange={setYearFilter}
          yearOptions={yearOptions}
          onGrantClick={handleGrantClick}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Box>

      <GrantDetailModal grant={selectedGrant} isOpen={isOpen} onClose={handleCloseModal} />
    </Stack>
  );
};
