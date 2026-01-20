import { Box, Grid, Heading, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

import { GrantRecord } from '../../types/grants';
import { extractFiscalYear } from '../../utils/fiscalYear';

interface GrantsDashboardProps {
  grants: GrantRecord[];
}

const CHART_COLORS = [
  '#e44550',
  '#ff4d15',
  '#f87045',
  '#fb7971',
  '#232264',
  '#7c7ba1',
  '#a9a9b8',
  '#30354b'
];

export const GrantsDashboard: FC<GrantsDashboardProps> = ({ grants }) => {
  const fiscalYearData = useMemo(() => {
    const counts: Record<string, number> = {};
    grants.forEach(grant => {
      const fy = extractFiscalYear(grant.fiscalQuarter);
      counts[fy] = (counts[fy] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }));
  }, [grants]);

  const activeThisMonth = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return grants.filter(grant => new Date(grant.activatedDate) >= thirtyDaysAgo).length;
  }, [grants]);

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    grants.forEach(grant => {
      const domain = grant.domain || 'Other';
      counts[domain] = (counts[domain] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }));
  }, [grants]);

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
      <Box
        p={6}
        bg='white'
        borderRadius='lg'
        border='1px solid'
        borderColor='brand.divider.100'
        shadow='sm'
      >
        <Heading size='sm' color='brand.heading' mb={4}>
          Grants by Fiscal Year
        </Heading>
        <Box h='180px'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={fiscalYearData}>
              <XAxis dataKey='name' tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey='count' fill='#e44550' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box
        p={6}
        bg='white'
        borderRadius='lg'
        border='1px solid'
        borderColor='brand.divider.100'
        shadow='sm'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <Stat textAlign='center'>
          <StatLabel color='brand.helpText' fontSize='sm'>
            Active This Month
          </StatLabel>
          <StatNumber color='brand.heading' fontSize='5xl' fontWeight='bold'>
            {activeThisMonth}
          </StatNumber>
          <Text fontSize='sm' color='brand.paragraph'>
            new contracts
          </Text>
        </Stat>
      </Box>

      <Box
        p={6}
        bg='white'
        borderRadius='lg'
        border='1px solid'
        borderColor='brand.divider.100'
        shadow='sm'
      >
        <Heading size='sm' color='brand.heading' mb={4}>
          By Category
        </Heading>
        <Box h='180px' position='relative'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={categoryData}
                cx='50%'
                cy='50%'
                innerRadius={50}
                outerRadius={70}
                dataKey='value'
                paddingAngle={2}
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Box
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            textAlign='center'
          >
            <Text fontSize='xl' fontWeight='bold' color='brand.paragraph'>
              {grants.length.toLocaleString()}
            </Text>
            <Text fontSize='xs' color='brand.helpText'>
              total
            </Text>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
