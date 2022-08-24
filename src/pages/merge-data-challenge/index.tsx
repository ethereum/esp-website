// Libraries
import { Box, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

// Components
import { ButtonLink } from '../../components';
import {
  ApplicantsSidebar,
  List,
  OrderedList,
  PageSection,
  PageSubheading,
  PageText,
  PageMetadata,
  ReadyToApply,
} from '../../components/UI';

// Constants
import {
  MERGE_DATA_CHALLENGE_EMAIL_ADDRESS,
  SIDEBAR_MERGE_DATA_CHALLENGE_LINKS,
  MERGE_DATA_CHALLENGE_APPLY_URL,
  MERGE_DATA_CHALLENGE_PREVIEW_URL
} from '../../constants';


const MergeDataChallenge: NextPage = () => {
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
  const [ref9, inView9] = useInView({ threshold: 0.5, initialInView: false });
  const [ref10, inView10] = useInView({ threshold: 0.5, initialInView: false });
  const [ref11, inView11] = useInView({ threshold: 0.5, initialInView: false });

  return (
    <>

      <PageMetadata
        title='The Merge data challenge'
        description='Up until October 31st, 2022, the Ethereum Foundation is sponsoring a Merge data analysis and data visualization blog post challenge. Here are all the details you need.'
        image={MERGE_DATA_CHALLENGE_PREVIEW_URL}
      />
      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
                sidebarLinks={SIDEBAR_MERGE_DATA_CHALLENGE_LINKS}
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
                ]}
              />


            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <section id='description' ref={ref}>
                  <PageSubheading mb={8}>
                    The Merge data challenge
                  </PageSubheading>

                  <PageText mb={6} fontStyle="italic">
                    Up until October 31st, 2022, the Ethereum Foundation is sponsoring a Merge data analysis and data visualization blog post challenge. Here are all the details you need.
                  </PageText>

                  <PageText mb={6}>
                    Calling all Ethereans, data scientists, data engineers, data visualizers, developers, and anyone interested in digging into Ethereum data!
                  </PageText>

                  <PageText mb={6}>
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://ethereum.org/en/upgrades/merge/'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      The Merge
                    </Link> is coming, providing a more secure and sustainable home for Ethereum—as well as more data, lots and lots of data. And <strong>the Ethereum community needs your help to make sense of it all.</strong>
                  </PageText>

                  <List>
                    <ListItem><PageText fontStyle="italic">What new visualizations help provide insight into proof-of-stake Ethereum?</PageText></ListItem>
                    <ListItem><PageText fontStyle="italic">How do the consensus layer and execution layer interact? Are there differences across client pairs in communication patterns, efficiency, etc? Are there good places to optimize?</PageText></ListItem>
                    <ListItem><PageText fontStyle="italic">What, if anything, changed on the network at the point of The Merge—block propagation times, p2p connections, transaction mempool performance, etc?</PageText></ListItem>
                    <ListItem><PageText fontStyle="italic">Did The Merge affect core Beacon Chain activity—attestation performance, blocks missed, sync committees?</PageText></ListItem>
                    <ListItem><PageText fontStyle="italic">Did user activity noticeably change after the Merge? What about MEV?</PageText></ListItem>
                    <ListItem><PageText fontStyle="italic">What new tools can you build to collect and analyze data in the post-Merge network?</PageText></ListItem>
                  </List>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='the-challenge' ref={ref2}>
                  <PageSection mb={6}>The challenge</PageSection>

                  <PageText mb={6}>
                    <strong>
                      Document your best Merge data insights in the most readable blog post possible—for prizes!
                    </strong>
                  </PageText>

                  <PageText mb={6}>
                    The Ethereum Foundation is running this challenge because there’s a lot to learn and discover from the Merge mainnet activity. Your findings will give the Ethereum community – from beginners to researchers and client developers – important insight into the Merge.
                  </PageText>

                  <PageText mb={6}>
                    Get started now if you want to gather date from both before and after the big event!
                  </PageText>
                </section>
              </Stack>

              <Stack>
                <section id='how-to-submit' ref={ref3}>
                  <PageSection as='h4' fontSize='h4'mb={6}>
                    How to submit
                  </PageSection>

                  <PageText mb={6}>
                    Anyone is free to submit, here’s how:
                  </PageText>

                  <Box mb={6}>
                    <OrderedList>
                      <ListItem>
                        Collect and analyze Merge data
                        <List>
                          <ListItem>
                            Either with existing tools
                          </ListItem>
                          <ListItem>
                            Or for the extra ambitious, build your own tool and tell us about it!
                          </ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        Detail out your work in a blog post
                      </ListItem>
                      <ListItem>
                        Submit!
                      </ListItem>
                    </OrderedList>
                  </Box>

                  <Box mb={6}>
                    <ButtonLink label="Submit blog post" link={MERGE_DATA_CHALLENGE_APPLY_URL} width="225px"/>
                  </Box>
                  
                  <PageText mb={6} fontStyle="italic">
                    You may submit more than one blog post! So long as each posts focuses on a different visualization or piece of analysis
                  </PageText>

                  <PageText mb={6}>
                    In addition to the prompt questions above, here’s a{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://notes.ethereum.org/@djrtwo/merge-data-comp-wish'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      wishlist of data analysis avenues to explore
                    </Link>
                    .
                  </PageText>

                  <PageText mb={6}>
                    A group of Ethereum community members will evaluate your submissions and awards will go to the top blog posts 🏆
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id="deadline" ref={ref4}>
                  <PageSection mb={6}>Deadline ⏰</PageSection>

                  <PageText mb={6}>
                    The deadline for submissions is <strong>October 31st, 2022</strong> (precise date TBD).
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id="prizes" ref={ref5}>
                  <PageSection mb={6}>Prizes 💸</PageSection>

                  <PageText mb={6}>
                    Up to <strong>USD $30,000</strong>
                  </PageText>
                  
                  <PageText mb={6} fontStyle="italic">
                    Entries must be considered sufficiently impactful/insightful by the community judging team to be eligible for rewards.
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id="requirements" ref={ref6}>
                  <PageSection mb={6}>Requirements</PageSection>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        Blog post must be in English
                        <List>
                          <ListItem>
                            There are no length requirements
                          </ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        Blog posts must be public and original
                      </ListItem>
                      <ListItem>
                        Data analysis or visualization must concern{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://ethereum.org/en/upgrades/merge/'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Merge
                        </Link>
                        {' '}network data
                      </ListItem>
                      <ListItem>
                        Tools and scripts used (and created) must be free and open source and referenced in the blog post
                      </ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id="judging-criteria" ref={ref7}>
                  <PageSection mb={6} >Judging criteria</PageSection>
                  <PageText mb={6} fontStyle="italic">
                    Surprise us with your creativity! But here are some judging criteria considerations:
                  </PageText>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        Overall quality and clarity of data analysis or data visualization
                        <List>
                          <ListItem>
                            Quality of insights into the Merge, clients, and Ethereum in general
                          </ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        Insights that lead to substantive changes/improvements in client implementations or specifications
                      </ListItem>
                      <ListItem>
                        Analyses or visualizations that help a non-technical audience gain insight into the network
                      </ListItem>
                      <ListItem>
                        Quality of contribution to the Ethereum tooling ecosystem (if applicable)
                      </ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id="how-to-get-started" ref={ref8}>
                  <PageSection mb={6}>How to get started</PageSection>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        Run / sync a{' '}
                        <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://ethereum.org/en/developers/docs/nodes-and-clients/run-a-node/'
                        isExternal
                        _hover={{ textDecoration: 'none' }}>
                          Mainnet client pair
                        </Link>
                      {' '}(or multiple clients)
                      </ListItem>
                      <ListItem>
                        Dig around a block explorer:
                        <List>
                          <ListItem>
                            <Link
                              fontWeight={700}
                              color='brand.orange.100'
                              href='https://etherscan.io/'
                              isExternal
                              _hover={{ textDecoration: 'none' }}
                            >
                              Etherscan
                            </Link>
                            {' '}/{' '}
                            <Link
                              fontWeight={700}
                              color='brand.orange.100'
                              href='https://beaconscan.com/'
                              isExternal
                              _hover={{ textDecoration: 'none' }}
                            >
                              BeaconScan
                            </Link>
                          </ListItem>
                          <ListItem>
                           <Link
                              fontWeight={700}
                              color='brand.orange.100'
                              href='https://beaconcha.in/'
                              isExternal
                              _hover={{ textDecoration: 'none' }}
                            >
                              Beaconcha.in
                            </Link>
                          </ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        Experiment with client APIs for single node statistic (i.e. {' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/ethereum/beacon-APIs'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          beacon-APIs
                        </Link>
                        {' '}and{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/ethereum/execution-apis/'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          execution-APIs
                        </Link>
                        )
                      </ListItem>
                      <ListItem>
                        Experiment with{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/wealdtech/ethdo'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          ethdo
                        </Link>
                        ,{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/protolambda/rumor'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          rumor
                        </Link>
                        ,{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/protolambda/zcli'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          zcli
                        </Link>
                        ,{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/wealdtech/chaind'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          chaind
                        </Link>
                        ,{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/blockchain-etl/ethereum-etl'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Ethereum ETL
                        </Link>
                        ,{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/blockchain-etl/ethereum2-etl'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Ethereum 2 ETL
                        </Link>
                        , and other existing data gathering and analysis tools
                      </ListItem>
                      <ListItem>
                        Write new tools to gather data
                      </ListItem>
                      <ListItem>
                        Crunch some numbers and spin up some graphs
                      </ListItem>
                      <ListItem>
                        Publish your analysis or visualization!
                      </ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id="helpful-resources" ref={ref9}>
                  <PageSection mb={6}>Helpful resources</PageSection>

                  <Box mb={6}>
                    <List>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://ethereum.org/en/upgrades/merge/'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Merge Overview
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://blog.ethereum.org/2022/08/24/mainnet-merge-announcement/'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Mainnet Merge Announcement blog post
                        </Link>
                      </ListItem>
                      <ListItem>
                        Specs
                        <List>
                          <ListItem>
                            <Link
                              fontWeight={700}
                              color='brand.orange.100'
                              href='https://github.com/ethereum/consensus-specs'
                              isExternal
                              _hover={{ textDecoration: 'none' }}
                            >
                              Consensus Layer specs
                            </Link>
                          </ListItem>
                          <ListItem>
                            <Link
                              fontWeight={700}
                              color='brand.orange.100'
                              href='https://github.com/ethereum/execution-specs'
                              isExternal
                              _hover={{ textDecoration: 'none' }}
                            >
                              Execution Layer specs
                            </Link>
                          </ListItem>
                          <ListItem>
                            <Link
                              fontWeight={700}
                              color='brand.orange.100'
                              href='https://eips.ethereum.org/EIPS/eip-3675'
                              isExternal
                              _hover={{ textDecoration: 'none' }}
                            >
                              EIP-3675
                            </Link>
                            {' '}&{' '}
                            <Link
                              fontWeight={700}
                              color='brand.orange.100'
                              href='https://eips.ethereum.org/EIPS/eip-4399'
                              isExternal
                              _hover={{ textDecoration: 'none' }}
                            >
                              EIP-4399
                            </Link>
                          </ListItem>
                          <ListItem>
                            <Link
                              fontWeight={700}
                              color='brand.orange.100'
                              href='https://github.com/ethereum/execution-apis/blob/main/src/engine/specification.md'
                              isExternal
                              _hover={{ textDecoration: 'none' }}
                            >
                              Engine API
                            </Link>
                          </ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://notes.ethereum.org/@MarioHavel/merge-resources'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Mega Merge Resource List
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://github.com/timbeiko/eth-roadmap-faq'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Ethereum Roadmap FAQ
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://ethereum.org/en/energy-consumption/'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Ethereum Energy Consumption
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://discord.gg/VmG7Uxc'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          Eth R&D
                        </Link>
                        {' '} - <PageText as='span' fontStyle="italic">Discord</PageText>
                      </ListItem>
                      <ListItem>
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href='https://invite.gg/ethstaker'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          ethstaker
                        </Link>
                        {' '} - <PageText as='span' fontStyle="italic">Discord</PageText>
                      </ListItem>
                    </List>
                  </Box>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id="support" ref={ref10}>
                  <PageSection mb={6}>Support</PageSection>

                  <PageText mb={6}>
                    For any general support questions about your submission, please email{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={`mailto:${MERGE_DATA_CHALLENGE_EMAIL_ADDRESS}`}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      {MERGE_DATA_CHALLENGE_EMAIL_ADDRESS}
                    </Link>
                    .
                  </PageText>
                </section>


                <section id='submit-blog-post' ref={ref11}>
                  <Stack>
                    <ReadyToApply
                      buttonText='Submit blog post'
                      buttonWidth='225px'
                      ctaText='Ready to submit?'
                      isApplyButton={false}
                      link={`${MERGE_DATA_CHALLENGE_APPLY_URL}`}
                    />
                  </Stack>
                </section>
              </Stack>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  )
}

export default MergeDataChallenge