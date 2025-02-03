import {
  Box,
  Flex,
  forwardRef,
  Link,
  ListItem,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'
import type { NextPage } from 'next'

import {
  ApplicantsSidebar,
  List,
  OrderedList,
  PageMetadata,
  PageSection,
  PageText,
  ReadyToApply,
} from '../../components/UI'

import {
  PECTRA_PGR_APPLY_URL,
  PECTRA_PGR_EMAIL_ADDRESS,
  SIDEBAR_PECTRA_PGR_LINKS
} from '../../constants'

import pectraPGRHero from '../../../public/images/pectra-pgr-hero.jpeg'

const Section = forwardRef((props, ref) => (
  <Flex as='section' ref={ref} gap={6} direction='column' {...props} />
))

const PectraPGR: NextPage = () => {
  const [ref, inView] = useInView({ threshold: 0 })
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false })
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false })
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false })
  const [ref5, inView5] = useInView({ threshold: 0.3, initialInView: false })
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false })
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false })
  const [ref8, inView8] = useInView({ threshold: 0.5, initialInView: false })
  const [ref9, inView9] = useInView({ threshold: 0.5, initialInView: false })
  const [ref10, inView10] = useInView({ threshold: 0.5, initialInView: false })
  return (
    <>
      <PageMetadata
        title='Pectra Proactive Grant Round'
        description='The Ethereum Foundation is sponsoring a wave of grants to support Ethereum ecosystem in preparation for the upcoming Pectra network upgrade. Find all the details you need to apply here.'
        image={pectraPGRHero.src}
      />

      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_PECTRA_PGR_LINKS}
              sectionsInView={[
                inView,
                inView2,
                inView3,
                inView4,
                inView5,
                inView6,
                inView7,
                inView8,
                inView9,
                inView10,
              ]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <Section id='about-the-grant-round' ref={ref}>
                  <PageSection>About the Grant Round</PageSection>
                  <PageText>
                    The <strong>Pectra Proactive Grant Round</strong> aims to address the lag in tooling, infrastructure, and ecosystem readiness following major Ethereum upgrades.
                  </PageText>
                  <PageText>
                    The Ethereum Foundation recognizes the challenges introduced by delayed updates in essential tooling post-upgrade. This grant round is a targeted initiative to ensure the ecosystem is:
                  </PageText>
                  <List>
                    <ListItem>
                      <strong>Well-prepared</strong> ahead of the Pectra upgrade.
                    </ListItem>
                    <ListItem>
                      <strong>Equipped</strong> with key tools and infrastructure.
                    </ListItem>
                    <ListItem>
                      <strong>Educated</strong> about upcoming changes.
                    </ListItem>
                  </List>
                  <PageText>
                    By providing funding and fostering proactive preparation, we aim to eliminate reactive, last-minute solutions and promote a culture of early readiness.
                  </PageText>
                  <Link
                    fontWeight={700}
                    color='brand.orange.100'
                    href='https://eips.ethereum.org/EIPS/eip-7600'
                    isExternal
                  >
                    Read more about the Pectra upgrade
                  </Link>
                </Section>
              </Stack>

              <Stack mb={8} spacing={10}>
                <Section id='key-focus-areas' ref={ref2}>
                  <PageSection>Key focus areas</PageSection>
                  <PageText>
                    Proposals submitted to the Pectra Proactive Grant Round should align with one or more of the following focus areas:
                  </PageText>
                  <OrderedList>
                    <ListItem><strong>Core Protocol Support</strong></ListItem>
                    <List>
                      <ListItem>
                        Development of tooling and libraries that directly support protocol-level changes introduced in Pectra.
                      </ListItem>
                      <ListItem>
                        Creation of infrastructure to ensure seamless integration of Pectra-related updates into the core protocol.
                      </ListItem>
                    </List>
                    <ListItem>
                      <strong>Tooling and Infrastructure</strong>
                    </ListItem>
                    <List>
                      <ListItem>
                        Updates to essential tools for builders, stakers, and end users.
                      </ListItem>
                      <ListItem>
                        Creation of new tools to support EIPs directly tied to Pectra.
                      </ListItem>
                    </List>
                    <ListItem><strong>Testing and Security</strong></ListItem>
                    <List>
                      <ListItem>
                        Enhancements to testing frameworks and infrastructure.
                      </ListItem>
                      <ListItem>
                        Tools that improve network security before and after Pectra upgrades.
                      </ListItem>
                    </List>
                    <ListItem>
                      <strong>Adoption and Impact Analysis</strong>
                    </ListItem>
                    <List>
                      <ListItem>
                        Projects that track and analyze the adoption of changes introduced by Pectra.
                      </ListItem>
                      <ListItem>
                        Tools or frameworks to measure the impact of Pectra related EIPs on the Ethereum ecosystem and protocol.
                      </ListItem>
                    </List>
                  </OrderedList>
                  <PageText>
                    <strong>Note:</strong> We also maintain a <strong>wishlist</strong> of ideas and priorities for the Pectra upgrade. You are <strong>not required</strong> to submit a project from the wishlist—it is provided for inspiration.
                  </PageText>
                  <Link
                    fontWeight={700}
                    color='brand.orange.100'
                    href='https://notes.ethereum.org/@BOR4/HyhTGy48Jl'
                    isExternal
                  >
                    Check out the Pectra wishlist
                  </Link>
                </Section>
              </Stack>

              {/* TODO: GET DATES FOR THIS TABLE */}
              <Stack mb={8} spacing={10}>
                <Section id='timeline' ref={ref3}>
                  <PageSection>Timeline</PageSection>
                  <TableContainer>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Milestone</Th>
                          <Th>Date</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Proposal Submission Opens</Td>
                          <Td>February 3rd</Td>
                        </Tr>
                        <Tr>
                          <Td>Submission Deadline</Td>
                          <Td>February 23rd</Td>
                        </Tr>
                        <Tr>
                          <Td>Review and Selection</Td>
                          <Td>February 24th - March 9th</Td>
                        </Tr>
                        <Tr>
                          <Td>Grant Awards Announced</Td>
                          <Td>[Insert date]</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Section>
              </Stack>

              <Stack mb={8} spacing={10}>
                <Section id='eligibility' ref={ref4}>
                  <PageSection>Eligibility</PageSection>
                  <PageText>
                    If you have an idea that aligns with the key focus area of Pectra Proactive Grant Round, we encourage you to apply!
                  </PageText>
                  <List>
                    <ListItem>
                      Projects <strong>must be open source</strong> with a free and permissive license.
                    </ListItem>
                    <ListItem>
                      Projects <strong>must be aligned with the stated goals and wishlist</strong> for this round.
                    </ListItem>
                    <ListItem>
                      We accept proposals from <strong>individuals, teams, or organizations</strong>.
                    </ListItem>
                    <ListItem>
                      We <strong>do not fund past work</strong>.
                    </ListItem>
                    <ListItem>
                      Builders of <strong>any age, origin, identity, or background</strong> are welcome to apply.
                    </ListItem>
                  </List>
                </Section>
              </Stack>

              <Stack mb={8} spacing={10}>
                <Section id='what-is-not-eligible' ref={ref5}>
                  <PageSection>What is NOT eligible</PageSection>
                  <List>
                    <ListItem>
                      Anything that is <strong>not legal</strong> within the jurisdiction where the work is taking place.
                    </ListItem>
                    <ListItem>
                      <strong>Financial products</strong> (e.g., trading, investment products, lending, betting, etc.).
                    </ListItem>
                    <ListItem>
                      Art projects or social impact projects that don&apos;t fit within the scope of this round.
                    </ListItem>
                    <ListItem>
                      Projects requesting retroactive funding
                    </ListItem>
                  </List>
                </Section>
              </Stack>

              <Stack mb={8} spacing={10}>
                <Section id='how-to-apply' ref={ref6}>
                  <PageSection>How to apply</PageSection>
                  <OrderedList>
                    <ListItem>
                      Read the <Link fontWeight={700}
                        color='brand.orange.100'
                        href='https://notes.ethereum.org/@BOR4/HJVaegyByl'
                        isExternal
                      >
                        Pectra Proactive Grand Round Proposal Template
                      </Link>
                      .
                    </ListItem>
                    <ListItem>
                      Submit your proposal following the guidelines.
                    </ListItem>
                  </OrderedList>
                  <Link
                    fontWeight={700}
                    color='brand.orange.100'
                    href='/pectra-pgr/apply'
                  >
                    Start your proposal here.
                  </Link>
                </Section>
              </Stack>

              
              <Stack mb={8} spacing={10}>
                <Section id='grant-size' ref={ref7}>
                  <PageSection>Grant size</PageSection>
                  <PageText>
                    Grants will vary based on the project scope and deliverables. Submit a clear budget breakdown and timeline.
                  </PageText>
                </Section>
              </Stack>

              <Stack mb={8} spacing={10}>
                <Section id="resources" ref={ref8}>
                  <PageSection>Resources</PageSection>
                  <List>
                    <ListItem>
                      <Link
                        fontWeight={300}
                        color='brand.orange.100'
                        href='https://eips.ethereum.org/EIPS/eip-7600'
                        isExternal
                      >
                        Pectra upgrade overview
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={300}
                        color='brand.orange.100'
                        href='https://notes.ethereum.org/@BOR4/HJVaegyByl'
                        isExternal
                      >
                        Proposal template
                      </Link>
                    </ListItem>
                  </List>
                </Section>
              </Stack>

              <Stack mb={8} spacing={10}>
                <Section id="get-involved" ref={ref9}>
                  <PageSection>Get involved</PageSection>
                  <PageText>Have questions? Want to learn more?</PageText>
                  <List>
                    <ListItem>
                      Reach out to use via <Link fontWeight={700} color='brand.orange.100' href={`mailto:${PECTRA_PGR_EMAIL_ADDRESS}`}>Email</Link>.
                    </ListItem>
                  </List>
                </Section>
              </Stack>

              <Stack mb={8} spacing={10}>
                <Section id="apply" ref={ref10}>
                  <ReadyToApply link={`${PECTRA_PGR_APPLY_URL}`} />
                </Section>
              </Stack>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  )
}

export default PectraPGR