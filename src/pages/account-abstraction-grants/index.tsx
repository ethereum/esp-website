import { Accordion, Box, Flex, Link, ListItem, Stack, Text } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  FAQItem,
  List,
  PageSection,
  PageText,
  PageMetadata,
  ReadyToApply
} from '../../components/UI';

import {
  ACCOUNT_ABSTRACTION_GRANTS_EMAIL_ADDRESS,
  ACCOUNT_ABSTRACTION_GRANTS_APPLY_URL,
  SIDEBAR_ACCOUNT_ABSTRACTION_GRANTS_LINKS,
  ACCOUNT_ABSTRACTION_GRANTS_PREVIEW_URL
} from '../../constants';

const AccountAbstractionGrants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0 });
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.3, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false });
  const [ref8, inView8] = useInView({ threshold: 0.5, initialInView: false });
  const [ref9, inView9] = useInView({ threshold: 0.5, initialInView: false });
  const [ref10, inView10] = useInView({ threshold: 0.5, initialInView: false });
  const [ref11, inView11] = useInView({ threshold: 0.5, initialInView: false });
  const [ref12, inView12] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Account Abstraction Grants 2023'
        description='The Ethereum Foundation is sponsoring a wave of grants to support work in Account Abstraction. Find all the details you need to apply here.'
        image={ACCOUNT_ABSTRACTION_GRANTS_PREVIEW_URL}
      />

      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_ACCOUNT_ABSTRACTION_GRANTS_LINKS}
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
                inView11,
                inView12
              ]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <section id='summary' ref={ref}>
                  <PageText mb={6}>
                    <Text as='i'>
                      Starting on <Text as='strong'>February 27, 2023</Text>, we will begin to
                      accept proposals over the next 4 weeks.
                    </Text>
                  </PageText>

                  <PageText mb={6}>
                    <Text as='strong'>Deadline: March 31, 2023</Text>
                  </PageText>

                  <PageText mb={6}>
                    <Text as='i'>
                      All of the details you&apos;ll need to apply can be found below.
                    </Text>
                  </PageText>
                </section>
              </Stack>

              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <section id='introduction' ref={ref2}>
                  <PageSection mb={6}>Introduction</PageSection>

                  <List>
                    <ListItem>
                      The Ethereum Foundation is launching a new grants round to encourage
                      development, research, and education around Account Abstraction and the
                      necessary infrastructure to support it.
                    </ListItem>
                    <ListItem>
                      While Account Abstractions frees the design space for user experience and
                      wallet innovation, the community still needs to build and establish a set of
                      standard interfaces without compromising on decentralization and
                      censorship-resistance.
                    </ListItem>
                    <ListItem>
                      We encourage the various community builders in the ecosystem to share their
                      ideas and apply! All genuine applications are reviewed and replied to with
                      feedback 😃
                    </ListItem>
                  </List>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='ideas' ref={ref3}>
                  <PageSection mb={6}>Ideas</PageSection>

                  <PageText mb={6}>
                    <Text as='strong'>
                      Surprise us with your creativity! But here are a few ideas to kickstart your
                      imagination:
                    </Text>
                  </PageText>

                  <List>
                    <ListItem>webauthn transaction validation</ListItem>
                    <ListItem>Account Abstraction Block Explorer</ListItem>
                    <ListItem>Bundlers</ListItem>
                    <ListItem>p2p messaging</ListItem>
                    <ListItem>sequencer RPC</ListItem>
                    <ListItem>
                      Data showing Account Abstraction wallets vs EOA Wallets (might be no. of
                      hacks, people signing up to AA wallets)
                    </ListItem>
                    <ListItem>Educational content:</ListItem>
                    <List>
                      <ListItem>
                        to help new and existing users understand Account Abstraction
                      </ListItem>
                      <ListItem>for protocols and developers</ListItem>
                    </List>
                  </List>

                  <PageText mt={6}>
                    <Text as='strong'>
                      Check out a full wishlist{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://hackmd.io/fpff2e4jTSqD0dHhSTUasA?both'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        here
                      </Link>
                      .
                    </Text>
                  </PageText>
                </section>

                <section id='deadline' ref={ref4}>
                  <PageSection mb={6}>Deadline</PageSection>

                  <PageText mb={6}>
                    The grant application window opens for <strong>4 weeks</strong> from{' '}
                    <strong>February 27th, 2023</strong> and closes on{' '}
                    <strong>March 31st, 2023</strong>.
                  </PageText>
                </section>

                <section id='submit-proposal' ref={ref5}>
                  <PageSection mb={6}>Submit a proposal at any stage of your project</PageSection>

                  <List>
                    <ListItem>Ideas and projects at any stage of development are welcome:</ListItem>
                    <List>
                      <ListItem>Idea phase</ListItem>
                      <ListItem>Proof-of-concept</ListItem>
                      <ListItem>Work in progress</ListItem>
                      <ListItem>Fleshed out project</ListItem>
                    </List>
                    <ListItem>
                      Grants are decided on a case-by-case basis, and you may enter more than one
                      proposal! So long as each proposal is unique and meets the requirements.
                    </ListItem>
                    <ListItem>
                      Proposals must be in a linked document in english. We have a general template
                      for an idea of what topics to include.
                    </ListItem>
                    <ListItem>We may contact you to discuss the project in more detail</ListItem>
                    <ListItem>
                      Due to the size of the grant round,{' '}
                      <strong>the budget for proposals will be capped at $50,000</strong>.
                    </ListItem>
                  </List>

                  <PageText mt={6}>
                    Submit your application{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={ACCOUNT_ABSTRACTION_GRANTS_APPLY_URL}
                      _hover={{ textDecoration: 'none' }}
                    >
                      here
                    </Link>
                    .
                  </PageText>
                </section>

                <section id='who-can-apply' ref={ref6}>
                  <PageSection mb={6}>Who can apply?</PageSection>

                  <List>
                    <ListItem>
                      Anyone passionate about building out the Account Abstraction ecosystem in a
                      collaborative way.
                    </ListItem>
                    <ListItem>
                      This is open to both individuals and teams from all parts of the world.
                    </ListItem>
                    <ListItem>
                      For-profit companies can apply, although the work for the grant must be open
                      source, freely accessible and non-commercial.
                    </ListItem>
                  </List>
                </section>

                <section id='requirements' ref={ref7}>
                  <PageSection mb={6}>Requirements</PageSection>

                  <List>
                    <ListItem>Proposals must be in English.</ListItem>
                    <ListItem>
                      Work must be open source with a free and permissive license.
                    </ListItem>
                    <ListItem>If published work, it must be accessible by a URL</ListItem>
                    <ListItem>
                      The{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://github.com/eth-infinitism/account-abstraction'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        working version of the EIP
                      </Link>{' '}
                      and the contracts implementation standard are required for any applicable
                      proposal.
                    </ListItem>
                  </List>
                </section>

                <section id='selection-criteria' ref={ref8}>
                  <PageSection mb={6}>Selection criteria</PageSection>

                  <PageText mb={6}>
                    A few selection criteria considerations, in no particular order (depending on
                    the submission type, some criteria might not be applicable):
                  </PageText>

                  <List>
                    <ListItem>
                      Potential impact on the Account Abstraction ecosystem and its adoption.
                    </ListItem>
                    <ListItem>Relevant experience for the project</ListItem>
                    <ListItem>Clarity, conciseness and organization of documentation</ListItem>
                    <ListItem>Contribution to the wishlist areas</ListItem>
                    <ListItem>The potential of long-term contribution</ListItem>
                    <ListItem>Timeline of project</ListItem>
                    <ListItem>Reasonable budget</ListItem>
                  </List>
                </section>

                <section id='helpful-resources' ref={ref9}>
                  <PageSection mb={6}>Helpful Resources</PageSection>

                  <List>
                    <ListItem>
                      Account Abstraction published{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://eips.ethereum.org/EIPS/eip-4337'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        EIP
                      </Link>
                    </ListItem>
                    <ListItem>
                      The latest version of the{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://github.com/eth-infinitism/account-abstraction'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        Account Abstraction contracts implementation
                      </Link>
                    </ListItem>
                    <ListItem>SDK - an API to create and send UserOperation</ListItem>
                    <List>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://www.npmjs.com/package/@account-abstraction/sdk'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          npm: account-abstraction/sdk
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/eth-infinitism/bundler/tree/main/packages/sdk'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          github
                        </Link>
                      </ListItem>
                    </List>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://github.com/eth-infinitism/bundler'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        Bundler Implementation
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://github.com/eth-infinitism/bundler-spec-tests'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        Bundler specification test suite
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://notes.ethereum.org/@yoav/unified-erc-4337-mempool'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        Unified ERC-4337 mempool
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://www.youtube.com/watch?v=xHWlJiL_iZA'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        ETH-Bogota workshop presentation
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://www.youtube.com/watch?v=QuYZWJj65AY'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        DevCon Bogota presentation
                      </Link>
                    </ListItem>
                    <ListItem>
                      Join the Account Abstraction converation in the{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://discord.gg/PVt4dn7zcQ'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        Infinitism discord
                      </Link>
                    </ListItem>
                  </List>
                </section>

                <section id='next-steps-and-support' ref={ref10}>
                  <PageSection mb={6}>Next steps and support</PageSection>

                  <PageText mb={6}>
                    For general support questions about your submission, please email{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={`mailto:${ACCOUNT_ABSTRACTION_GRANTS_EMAIL_ADDRESS}`}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      account-abstraction@ethereum.org
                    </Link>
                  </PageText>
                </section>

                <section id='faq' ref={ref11}>
                  <PageSection mb={6}>Frequently asked questions</PageSection>

                  <Accordion allowToggle>
                    <FAQItem question='What is the budget available for this round?'>
                      <PageText>
                        This grants round has up to <strong>$350,000 in total</strong>, which is to
                        be distributed among the various selected projects. Due to the size of the
                        grant round,{' '}
                        <strong>the budget for proposals will be capped at $50,000</strong>.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Why are budgets limited to $50,000?'>
                      <PageText>
                        While recognizing this might not be enought to sustain projects in the long
                        term, the intent of the grants round is to foster and kick-start multiple
                        new projects related to Account Abstraction. Furthermore, projects can{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://esp.ethereum.foundation/applicants'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          apply to the standard grants program
                        </Link>{' '}
                        for additional funding.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='When can I expect to hear back?'>
                      <PageText>
                        Project submissions will be evaluated on a rolling basis, and contact will
                        be made with each applicant to inform them about the evaluation outcome.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What makes a good proposal?'>
                      <PageText>
                        In short, we need enough information to understand your objectives, the
                        problem you’re aiming to tackle, the output, information on previous
                        research work, who’s involved and estimation regarding time and budget.
                      </PageText>

                      <PageText>
                        The more details you provide, the more likely we’ll be able to help.
                      </PageText>

                      <Box>
                        <PageText>
                          For example - what could be included in the grant proposal:
                        </PageText>
                        <List>
                          <ListItem>
                            Clearly showing the research area, you’re digging into.
                          </ListItem>
                          <ListItem>Outlining the output.</ListItem>
                          <ListItem>
                            Clearly state the impact your research will have and how you foresee
                            your findings being used by the Ethereum community.
                          </ListItem>
                          <ListItem>
                            A detailed description of your project, milestones, the people involved
                            and how much time you think it will take to complete with a budget.
                          </ListItem>
                        </List>
                      </Box>

                      <PageText>There is no template for a proposal.</PageText>
                    </FAQItem>

                    <FAQItem question='What if I miss the deadline?'>
                      <PageText>
                        The Ethereum Foundation has a general grants initiative called the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://esp.ethereum.foundation/'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Ecosystem Support Program (ESP)
                        </Link>
                        . We encourage you to{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://esp.ethereum.foundation/applicants'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          submit an inquiry
                        </Link>{' '}
                        for support through the program.
                      </PageText>

                      <PageText>
                        If you missed the deadline for this dedicated round of grants, but have a
                        proposal that advances the Ethereum ecosystem. In that case, we also
                        encourage you to book an appointment for{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://esp.ethereum.foundation/applicants/office-hours'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          ESP’s Office Hours
                        </Link>
                        .
                      </PageText>
                    </FAQItem>
                  </Accordion>
                </section>

                <section id='apply' ref={ref12}>
                  <Stack mt={6}>
                    <ReadyToApply link={ACCOUNT_ABSTRACTION_GRANTS_APPLY_URL} />
                  </Stack>
                </section>
              </Stack>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default AccountAbstractionGrants;
