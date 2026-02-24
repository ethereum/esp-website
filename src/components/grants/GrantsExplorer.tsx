import { Box, Grid, Skeleton, SkeletonCircle, Stack, useDisclosure } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { FC, useEffect, useMemo, useState } from 'react';

import { GrantRecord } from '../../types/grants';
import { GrantsTable } from './GrantsTable';
import { GrantDetailModal } from './GrantDetailModal';

const DashboardSkeleton = () => (
  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} alignItems='stretch'>
    {/* Grants by Quarter skeleton */}
    <Box
      p={6}
      bg='white'
      borderRadius='lg'
      border='1px solid'
      borderColor='brand.divider.100'
      shadow='sm'
      display='flex'
      flexDirection='column'
      justifyContent='center'
    >
      <Skeleton height='20px' width='120px' mx='auto' mb={4} />
      <Box h='180px' display='flex' alignItems='flex-end' justifyContent='space-around' px={2}>
        {[60, 80, 100, 70, 90, 50].map((h, i) => (
          <Skeleton key={i} width='12%' height={`${h}%`} borderRadius='4px 4px 0 0' />
        ))}
      </Box>
    </Box>

    {/* Awarded This Quarter skeleton */}
    <Box
      p={6}
      bg='white'
      borderRadius='lg'
      border='1px solid'
      borderColor='brand.divider.100'
      shadow='sm'
      display='flex'
      flexDirection='column'
      justifyContent='center'
    >
      <Skeleton height='20px' width='140px' mx='auto' mb={4} />
      <Box h='180px' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <Skeleton height='60px' width='80px' mb={2} />
        <Skeleton height='14px' width='40px' />
      </Box>
    </Box>

    {/* By Domain skeleton */}
    <Box
      p={6}
      bg='white'
      borderRadius='lg'
      border='1px solid'
      borderColor='brand.divider.100'
      shadow='sm'
      display='flex'
      flexDirection='column'
      justifyContent='center'
    >
      <Skeleton height='20px' width='80px' mx='auto' mb={4} />
      <Box h='180px' display='flex' alignItems='center' justifyContent='center'>
        <SkeletonCircle size='140px' />
      </Box>
    </Box>

    {/* By Output skeleton */}
    <Box
      p={6}
      bg='white'
      borderRadius='lg'
      border='1px solid'
      borderColor='brand.divider.100'
      shadow='sm'
      display='flex'
      flexDirection='column'
      justifyContent='center'
    >
      <Skeleton height='20px' width='80px' mx='auto' mb={4} />
      <Box h='180px' display='flex' alignItems='center' justifyContent='center'>
        <SkeletonCircle size='140px' />
      </Box>
    </Box>
  </Grid>
);

const GrantsDashboard = dynamic(
  () => import('./GrantsDashboard').then(m => ({ default: m.GrantsDashboard })),
  { ssr: false, loading: () => <DashboardSkeleton /> }
);

interface GrantsExplorerProps {
  grants: GrantRecord[];
}

export const GrantsExplorer: FC<GrantsExplorerProps> = ({ grants }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const [outputFilter, setOutputFilter] = useState<string | null>(null);
  const [grantRoundFilter, setGrantRoundFilter] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [quarterFilter, setQuarterFilter] = useState<string | null>(null);
  const [selectedGrant, setSelectedGrant] = useState<GrantRecord | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, domainFilter, outputFilter, grantRoundFilter, yearFilter, quarterFilter]);

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

  const grantRoundOptions = useMemo(() => {
    return Array.from(new Set(grants.map(g => g.grantRound).filter((r): r is string => r !== null))).sort();
  }, [grants]);

  const yearOptions = useMemo(() => {
    // Extract year from fiscalQuarter (e.g., "2025 Q1" -> "2025")
    return Array.from(new Set(grants.map(g => g.fiscalQuarter.split(' ')[0]))).sort().reverse();
  }, [grants]);

  const quarterOptions = useMemo(() => {
    // Full fiscal quarters (e.g., "2025 Q1", "2024 Q4")
    return Array.from(new Set(grants.map(g => g.fiscalQuarter))).sort().reverse();
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
      const matchesGrantRound = grantRoundFilter === null || grant.grantRound === grantRoundFilter;
      const matchesYear = yearFilter === null || grant.fiscalQuarter.startsWith(yearFilter);
      const matchesQuarter = quarterFilter === null || grant.fiscalQuarter === quarterFilter;

      return matchesSearch && matchesDomain && matchesOutput && matchesGrantRound && matchesYear && matchesQuarter;
    });
  }, [grants, searchQuery, domainFilter, outputFilter, grantRoundFilter, yearFilter, quarterFilter]);

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
          grantRoundFilter={grantRoundFilter}
          onGrantRoundFilterChange={setGrantRoundFilter}
          grantRoundOptions={grantRoundOptions}
          yearFilter={yearFilter}
          onYearFilterChange={setYearFilter}
          yearOptions={yearOptions}
          quarterFilter={quarterFilter}
          onQuarterFilterChange={setQuarterFilter}
          quarterOptions={quarterOptions}
          onGrantClick={handleGrantClick}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Box>

      <GrantDetailModal grant={selectedGrant} isOpen={isOpen} onClose={handleCloseModal} />
    </Stack>
  );
};
