import {
  Flex,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import Image from 'next/image';

import { ButtonLink } from '../../ButtonLink';
import { PageSection, PageText } from '../../UI';

import communityOrganizersVector from '../../../../public/images/community-organizers-vector.svg';
import otherGrantProgramsVector from '../../../../public/images/other-grant-programs-vector.svg';
import researchersVector from '../../../../public/images/researchers-vector.svg';

import { FOUNDER_SUCCESS_URL, ENTERPRISE_ACCELERATION_URL, ETHEREUM_EVERYWHERE_URL } from '../../../constants';

const SupportTeamCards = () => {
  const otherSupportCards = [
    {
      title: 'Founders',
      description:
        "Level up your founder journey with access to programs, mentorship, and visibility across the Ethereum ecosystem.",
      ctaLabel: 'Founder Success',
      href: FOUNDER_SUCCESS_URL,
      icon: {
        src: researchersVector,
        alt: 'Illustration representing founder success support'
      }
    },
    {
      title: 'Businesses',
      description:
        'Explore potential pathways and opportunities for businesses and enterprise looking to leverage Ethereum.',
      ctaLabel: 'Enterprise Team',
      href: ENTERPRISE_ACCELERATION_URL,
      icon: {
        src: otherGrantProgramsVector,
        alt: 'Building illustration representing business growth'
      }
    },
    {
      title: 'Community Builders',
      description:
        'Request support for organizing an event or launching a community initiative.',
      ctaLabel: 'Ethereum Everywhere',
      href: ETHEREUM_EVERYWHERE_URL,
      icon: {
        src: communityOrganizersVector,
        alt: 'Community illustration representing collaboration'
      }
    }
  ];

  return (
    <Stack spacing={6}>
      <PageSection textAlign='left'>Other EcoDev Teams</PageSection>

      <PageText>
        Looking for different support? Connect with the team that best matches your next step in the ecosystem.
      </PageText>
      <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={{ base: 6, md: 8 }}>
        {otherSupportCards.map((card) => (
          <Stack
            key={card.title}
            bg='brand.warning'
            borderRadius='16px'
            p={{ base: 6, md: 8 }}
            spacing={5}
            align='flex-start'
            height='100%'
          >
            <Flex
              alignItems='center'
              justifyContent='center'
              flexWrap={'wrap'}
              bg='white'
              borderRadius='12px'
              p={4}
              height='80px'
              width='80px'
            >
              <Image src={card.icon.src} alt={card.icon.alt} width={48} height={48} />
            </Flex>

            <PageSection as='h4' fontSize='20px' lineHeight='28px' textAlign='left'>
              {card.title}
            </PageSection>

            <PageText flex={1}>{card.description}</PageText>

            <ButtonLink
              label={card.ctaLabel}
              link={card.href}
              width='fit-content'
            />
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default SupportTeamCards;