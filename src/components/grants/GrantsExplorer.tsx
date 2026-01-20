import { Box, Stack, useDisclosure } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';

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
  const [selectedGrant, setSelectedGrant] = useState<GrantRecord | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const domainOptions = useMemo(() => {
    return Array.from(new Set(grants.map(g => g.domain).filter((d): d is string => d !== null))).sort();
  }, [grants]);

  const outputOptions = useMemo(() => {
    return Array.from(new Set(grants.map(g => g.output).filter((o): o is string => o !== null))).sort();
  }, [grants]);

  const filteredGrants = useMemo(() => {
    return grants.filter(grant => {
      const matchesSearch =
        searchQuery === '' ||
        grant.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDomain = domainFilter === null || grant.domain === domainFilter;
      const matchesOutput = outputFilter === null || grant.output === outputFilter;

      return matchesSearch && matchesDomain && matchesOutput;
    });
  }, [grants, searchQuery, domainFilter, outputFilter]);

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
          onGrantClick={handleGrantClick}
        />
      </Box>

      <GrantDetailModal grant={selectedGrant} isOpen={isOpen} onClose={handleCloseModal} />
    </Stack>
  );
};
