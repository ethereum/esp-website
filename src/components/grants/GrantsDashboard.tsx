import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

import { GrantRecord } from '../../types/grants';
import { deriveFiscalQuarter } from '../../utils/fiscalYear';
import { colors } from '../../theme/foundations/colors';

interface GrantsDashboardProps {
  grants: GrantRecord[];
}

// Derived from brand tokens — recharts requires raw hex strings
const CHART_COLORS = [
  colors.brand.heading,
  colors.brand.orange[100],
  colors.brand.orange[200],
  colors.brand.hover,
  colors.brand.paragraph,
  colors.brand.helpText,
  colors.brand.border,
  colors.brand.ready.text
];

export const GrantsDashboard: FC<GrantsDashboardProps> = ({ grants }) => {
  const fiscalQuarterData = useMemo(() => {
    const counts: Record<string, number> = {};
    grants.forEach(grant => {
      const fq = grant.fiscalQuarter;
      counts[fq] = (counts[fq] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }));
  }, [grants]);

  const awardedThisQuarter = useMemo(() => {
    const currentQuarter = deriveFiscalQuarter(new Date().toISOString().slice(0, 10));
    return grants.filter(grant => grant.fiscalQuarter === currentQuarter).length;
  }, [grants]);

  const domainData = useMemo(() => {
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

  const outputData = useMemo(() => {
    const counts: Record<string, number> = {};
    grants.forEach(grant => {
      const output = grant.output || 'Other';
      counts[output] = (counts[output] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }));
  }, [grants]);

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6} alignItems='stretch'>
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
        <Heading size='sm' color='brand.heading' mb={4} textAlign='center'>
          Grants by Quarter
        </Heading>
        <Box h='180px'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={fiscalQuarterData} margin={{ left: 10, right: 10 }}>
              <XAxis dataKey='name' tick={{ fontSize: 11 }} />
              <YAxis hide />
              <Tooltip wrapperStyle={{ zIndex: 10 }} />
              <Bar dataKey='count' fill={colors.brand.heading} radius={[4, 4, 0, 0]} />
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
        justifyContent='center'
      >
        <Heading size='sm' color='brand.heading' mb={4} textAlign='center'>
          Awarded This Quarter
        </Heading>
        <Box h='180px' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <Text color='brand.heading' fontSize='5xl' fontWeight='bold' lineHeight='1'>
            {awardedThisQuarter}
          </Text>
          <Text fontSize='sm' color='brand.paragraph' mt={1}>
            grants
          </Text>
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
        justifyContent='center'
      >
        <Heading size='sm' color='brand.heading' mb={4} textAlign='center'>
          By Domain
        </Heading>
        <Box h='180px' position='relative'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={domainData}
                cx='50%'
                cy='50%'
                innerRadius={50}
                outerRadius={70}
                dataKey='value'
                paddingAngle={2}
              >
                {domainData.map((_, index) => (
                  <Cell key={`cell-domain-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ zIndex: 10 }} />
            </PieChart>
          </ResponsiveContainer>
          <Box
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            textAlign='center'
            pointerEvents='none'
            zIndex={1}
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
        <Heading size='sm' color='brand.heading' mb={4} textAlign='center'>
          By Output
        </Heading>
        <Box h='180px' position='relative'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={outputData}
                cx='50%'
                cy='50%'
                innerRadius={50}
                outerRadius={70}
                dataKey='value'
                paddingAngle={2}
              >
                {outputData.map((_, index) => (
                  <Cell key={`cell-output-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ zIndex: 10 }} />
            </PieChart>
          </ResponsiveContainer>
          <Box
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            textAlign='center'
            pointerEvents='none'
            zIndex={1}
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
