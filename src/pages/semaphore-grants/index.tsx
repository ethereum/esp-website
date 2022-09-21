// Libraries
import { Accordion, Box, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

// Components
import {
  ApplicantsSidebar,
  List,
  OrderedList,
  PageSection,
  PageSubheading,
  PageText,
  PageMetadata,
  ReadyToApply,
  FAQItem
} from '../../components/UI';

// Constants
import {
  SIDEBAR_SEMAPHORE_GRANT_LINKS,
  SEMAPHORE_GRANT_APPLY_URL,
  SEMAPHORE_GRANT_EMAIL_ADDRESS,
  SEMAPHORE_GRANT_PREVIEW_URL
} from '../../constants';

const SemaphoreGrants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0 });
  const [ref2, inView2] = useInView({ threshold: 0.5, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.5, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false });
  const [ref8, inView8] = useInView({ threshold: 0.5, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Semaphore Community Grants'
        description='Semaphore is a privacy preserving public good developed by the Ethereum Foundation’s Privacy and Scaling Explorations (PSE) team. The community grants round is intended to encourage developers to build applications using Semaphore’s simple and generic privacy layer.'
        image={SEMAPHORE_GRANT_PREVIEW_URL}
      />
      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_SEMAPHORE_GRANT_LINKS}
              sectionsInView={[
                inView,
                inView2,
                inView3,
                inView4,
                inView5,
                inView6,
                inView7,
                inView8
              ]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <section id='description' ref={ref}>
                  <PageSubheading mb={8}>Semaphore Community Grants</PageSubheading>

                  <PageText mb={6}>
                    The{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://appliedzkp.org/'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      Privacy and Scaling Explorations Team
                    </Link>{' '}
                    is sponsoring a dedicated round of grants for applications that integrate the{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://semaphore.appliedzkp.org/'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      Semaphore
                    </Link>{' '}
                    anonymous signaling protocol. Semaphore provides zero-knowledge primitives that
                    enable developers to build powerful privacy preserving applications. With this
                    grant round, we’re encouraging builders to try out these tools in real-world
                    applications that matter to your communities.
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='privacy-matters' ref={ref2}>
                  <PageSection mb={6}>Privacy matters</PageSection>

                  <PageText mb={6}>
                    Whether it’s talking confidentially with friends, anonymously broadcasting
                    messages, or simply wanting to choose which aspects of our identity we reveal in
                    which contexts, privacy allows us to express ourselves freely and without fear.
                    Privacy is a tool that should be accessible to as many people as possible, and
                    PSE’s goal is to foster a collaborative community to make access to privacy a
                    reality in everyday life.
                  </PageText>

                  <PageText mb={6}>
                    If you’re a developer with an idea to use Semaphore for good, we want to hear
                    from you!
                  </PageText>
                </section>
              </Stack>

              <Stack>
                <section id='semaphore-as-privacy-layer' ref={ref3}>
                  <PageSection mb={6}>Semaphore as a privacy layer</PageSection>

                  <PageText mb={6}>
                    Semaphore is designed to be a simple and generic privacy layer for decentralized
                    applications (dApps) on Ethereum.{' '}
                  </PageText>

                  <PageText mb={6}>
                    Semaphore is a{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://z.cash/technology/zksnarks'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      zero-knowledge
                    </Link>{' '}
                    protocol that allows Ethereum users to prove their membership of a group and
                    send signals such as votes or endorsements without revealing their original
                    identity.
                  </PageText>

                  <PageText mb={6}>
                    With Semaphore, you can allow your users to do the following:
                  </PageText>

                  <Box mb={6}>
                    <OrderedList>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://semaphore.appliedzkp.org/docs/guides/identities'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Create a private identity and receive a provable anonymous public identity
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://semaphore.appliedzkp.org/docs/guides/groups'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Add an anonymous public identity to a group (a Merkle tree)
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://semaphore.appliedzkp.org/docs/guides/proofs'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Send a verifiable, anonymous vote or endorsement (a signal)
                        </Link>
                      </ListItem>
                    </OrderedList>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='semaphore-in-action' ref={ref4}>
                  <PageSection mb={6}>Semaphore in action</PageSection>

                  <PageText mb={6}>
                    You can integrate Semaphore into other primitives, POCs, or end-user
                    applications. Below is a list of several apps already using Semaphore. They may
                    give you an idea of what to build.
                  </PageText>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/Unirep/Unirep'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Unirep
                        </Link>{' '}
                        is a social media platform that uses anonymous reputation. Semaphore
                        identities allow users to join with a unique identity, prove they’re
                        eligible to post or give feedback, and choose how much of their stable
                        identity they reveal in any given interaction.
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://interep.link/'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Interep
                        </Link>{' '}
                        uses zero knowledge proofs to verify reputation from an existing account
                        such as Github or Twitter without retaining any identifying information.
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://www.zkitter.com/explore/'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Zkitter
                        </Link>{' '}
                        is a decentralized social network based on Ethereum and ENS. It uses
                        Semaphore for anonymous user identities.
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://ethglobal.com/showcase/emergence-o3tns'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Emergence
                        </Link>{' '}
                        incentivizes communities to participate or contribute to online meetings.
                        The project uses Semaphore to preserve the anonymity of group members and
                        was a finalist at the ETHMexico hackathon.
                      </ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='wishlist' ref={ref5}>
                  <PageSection mb={6}>Wishlist</PageSection>

                  <PageText mb={6}>
                    Surprise us with your creativity! But here are a few ideas for
                    privacy-preserving applications we would love to see built out:
                  </PageText>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        General
                        <List>
                          <ListItem>Anonymous feedback</ListItem>
                          <ListItem>Anonymous voting</ListItem>
                          <ListItem>Whistleblower protection</ListItem>
                          <ListItem>
                            Anonymous chat for members of an organization or school
                          </ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        Professional
                        <List>
                          <ListItem>
                            Prove professional skills, credentials, or certificates without
                            revealing identity
                          </ListItem>
                          <ListItem>
                            Prove one does not have a criminal record without revealing identifying
                            information
                          </ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        Medical
                        <List>
                          <ListItem>Privately share vaccination status</ListItem>
                          <ListItem>Privately share medical history</ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        Government
                        <List>
                          <ListItem>
                            Privately prove income or residence to access government benefits and
                            services
                          </ListItem>
                          <ListItem>
                            Privately prove the number of countries one can visit with a certain
                            passport
                          </ListItem>
                          <ListItem>Privately share one’s age</ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        Cybersecurity
                        <List>
                          <ListItem>
                            Prove a device has the latest security patches and versions without
                            disclosing any personal identifying information
                          </ListItem>
                        </List>
                      </ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='how-to-apply' ref={ref6}>
                  <PageSection mb={6}>How to apply</PageSection>

                  <PageText mb={6}>
                    Grants are decided on a case-by-case basis. You can apply with more than one
                    proposal so long as each proposal is unique and meets the requirements.
                  </PageText>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        Ideas and projects at any stage are welcome:
                        <List>
                          <ListItem>Idea phase</ListItem>
                          <ListItem>Proof-of-concept</ListItem>
                          <ListItem>Work in progress</ListItem>
                          <ListItem>Fully fleshed-out project</ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        Requirements:
                        <List>
                          <ListItem>Proposals must be in English</ListItem>
                          <ListItem>
                            Work must be open source with a free and permissive license
                          </ListItem>
                          <ListItem>Published work must be accessible by a URL</ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        What we look for:
                        <List>
                          <ListItem>
                            Potential impact on broadening the Semaphore community
                          </ListItem>
                          <ListItem>Quality of contribution to the Semaphore ecosystem</ListItem>
                          <ListItem>
                            Clarity, conciseness, and organization of documentation
                          </ListItem>
                          <ListItem>
                            Novelty in reducing the barrier of entry to zero knowledge and privacy
                            applications
                          </ListItem>
                          <ListItem>
                            Overall quality and clarity of data analysis or data visualization.
                          </ListItem>
                        </List>
                      </ListItem>
                      <ListItem>Application dates: September 16th to October 14th, 2022</ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='faq' ref={ref7}>
                  <PageSection mb={6}>Frequently asked questions</PageSection>

                  <Accordion allowToggle>
                    <FAQItem question='How can I learn more about Semaphore?'>
                      <PageText>
                        Check out the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/semaphore-protocol'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Semaphore Github
                        </Link>{' '}
                        repo or go to the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='http://semaphore.appliedzkp.org/'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Semaphore website
                        </Link>
                        .
                      </PageText>
                    </FAQItem>

                    <FAQItem question='I have more questions, where do I go?'>
                      <List>
                        <ListItem>
                          The best place to ask technical questions about the Semaphore protocol or
                          questions about this grant round is in our{' '}
                          <Link
                            fontWeight={700}
                            color='brand.orange.100'
                            href='https://discord.gg/CkdbBqDDWU'
                            isExternal
                            _hover={{ textDecoration: 'none' }}
                          >
                            Discord server
                          </Link>
                          .
                        </ListItem>
                        <ListItem>
                          We will also be at Devcon VI in Bogota. Come say hello if you’re in town!
                          We will be located at the Temporary Anonymous Zone (TAZ) in the Community
                          Hub.
                        </ListItem>
                        <ListItem>
                          You can also email questions to:{' '}
                          <Link
                            fontWeight={700}
                            color='brand.orange.100'
                            href={`mailto:${SEMAPHORE_GRANT_EMAIL_ADDRESS}`}
                            isExternal
                            _hover={{ textDecoration: 'none' }}
                          >
                            {SEMAPHORE_GRANT_EMAIL_ADDRESS}
                          </Link>
                        </ListItem>
                      </List>
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
                        . If you miss the deadline for this dedicated round of grants, but have a
                        proposal, head on over to ESP for a rolling grants process.
                      </PageText>
                    </FAQItem>
                  </Accordion>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='apply' ref={ref8}>
                  <Stack mt={6}>
                    <ReadyToApply link={`${SEMAPHORE_GRANT_APPLY_URL}`} />
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

export default SemaphoreGrants;
