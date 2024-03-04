import { Box, Flex, forwardRef, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  List,
  PageSection,
  PageText,
  PageMetadata,
  ReadyToApply,
  OrderedList
} from '../../components/UI';

import {
  GRANTS_EMAIL_ADDRESS,
  DATA_CHALLENGE_APPLY_URL,
  SIDEBAR_DATA_CHALLENGE_LINKS,
  DATA_CHALLENGE_GRANTS_PREVIEW_URL
} from '../../constants';

const Section = forwardRef((props, ref) => (
  <Flex as='section' ref={ref} gap={6} direction='column' {...props} />
));

const DataChallenge: NextPage = () => {
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
  const [ref12, inView12] = useInView({ threshold: 0.5, initialInView: false });
  const [ref13, inView13] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='4844 Data Challenge'
        description='The Ethereum Foundation is sponsoring a 4844 data analysis and visualization blog post challenge. Here are all the details you need.'
        image={DATA_CHALLENGE_GRANTS_PREVIEW_URL}
      />

      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_DATA_CHALLENGE_LINKS}
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
                inView12,
                inView13
              ]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <Section id='introduction' ref={ref}>
                  <PageText>
                    Calling all Ethereans, data scientists, data engineers, data visualizers,
                    developers, and anyone interested in digging into Ethereum data!
                  </PageText>

                  <PageText>
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://eips.ethereum.org/EIPS/eip-4844'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      EIP-4844
                    </Link>{' '}
                    is coming, providing a more scalable gas market for Ethereum’s future – as well
                    as more data, lots and lots of data. And the Ethereum community needs your help
                    to make sense of it all.
                  </PageText>
                </Section>
              </Stack>

              <Stack spacing={10}>
                <Section id='the-challenge' ref={ref3}>
                  <PageSection>The challenge</PageSection>

                  <PageText fontWeight='bold'>
                    Document your best 4844 data insights in the most readable blog post possible –
                    for prizes!
                  </PageText>

                  <PageText>
                    The Ethereum Foundation is running this challenge because there’s a lot to learn
                    and discover from 4844’s mainnet activity. Your findings will give the Ethereum
                    community – from beginners to researchers and client developers – important
                    insights into blob data and transactions.
                  </PageText>
                </Section>

                <Section id='wishlist' ref={ref2}>
                  <PageSection>Wishlist</PageSection>

                  <List>
                    <ListItem>
                      What new visualizations help provide insight into the blob data market?
                    </ListItem>
                    <ListItem>What kinds of protocols are using blobs?</ListItem>
                    <ListItem>How does blob gossip perform on the mainnet p2p network?</ListItem>
                  </List>

                  <PageText>
                    In addition to the prompt questions above, here’s a{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://notes.ethereum.org/@drigolvc/4844-data-round-wishlist'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      wishlist of data analysis avenues to explore
                    </Link>
                    .
                  </PageText>
                </Section>

                <Section id='prizes' ref={ref6}>
                  <PageSection>Prizes</PageSection>

                  <PageText>
                    Up to <strong>USD $30,000</strong>
                  </PageText>

                  <PageText>
                    Entries must be considered sufficiently impactful/insightful by the community
                    judging team to be eligible for rewards.
                  </PageText>
                </Section>

                <Section id='how-to-submit' ref={ref4}>
                  <PageSection>How to submit</PageSection>

                  <PageText>Anyone is free to submit, here’s how:</PageText>

                  <OrderedList>
                    <ListItem>Collect and analyze 4844 data</ListItem>
                    <List>
                      <ListItem>Either with existing tools</ListItem>
                      <ListItem>
                        Or for the extra ambitious, build your own tool and tell us about it!
                      </ListItem>
                    </List>
                    <ListItem>Detail out your work in a blog post</ListItem>
                    <ListItem>Submit!</ListItem>
                  </OrderedList>

                  <PageText>
                    You may submit more than one blog post! So long as each posts focuses on a
                    different visualisation or piece of analysis.
                  </PageText>
                </Section>

                <Section id='requirements' ref={ref7}>
                  <PageSection>Requirements</PageSection>

                  <List>
                    <ListItem>Blog post must be in English</ListItem>
                    <List>
                      <ListItem>There are no length requirements</ListItem>
                    </List>
                    <ListItem>Blog posts must be public and original</ListItem>
                    <ListItem>Data analysis or visualization must concern EIP-4844 data</ListItem>
                    <ListItem>
                      Tools and scripts used (and created) must be free and open source and
                      referenced in the blog post
                    </ListItem>
                  </List>
                </Section>

                <Section id='deadline' ref={ref5}>
                  <PageSection>Deadline</PageSection>

                  <PageText>
                    Submissions are due <strong>23:59 UTC June 14th, 2024</strong>.
                  </PageText>
                </Section>

                <Section id='judging-criteria' ref={ref8}>
                  <PageSection>Judging criteria</PageSection>

                  <PageText>
                    Prizes for this round will be selected by judges from the Ethereum Foundation
                    and community using the following considerations. Note: depending on the
                    proposal, some criteria might not be applicable:
                  </PageText>

                  <List>
                    <ListItem>
                      Overall quality and clarity of data analysis or data visualization
                    </ListItem>
                    <List>
                      <ListItem>Quality of insights into the effects of EIP-4844</ListItem>
                    </List>
                    <ListItem>
                      Insights that lead to substantive changes/improvements in client
                      implementations or specifications
                    </ListItem>
                    <ListItem>
                      Analyses or visualizations that help a non-technical audience gain insight
                      into the network
                    </ListItem>
                    <ListItem>
                      Quality of contribution to the Ethereum tooling ecosystem (if applicable)
                    </ListItem>
                  </List>
                </Section>

                <Section id='started' ref={ref9}>
                  <PageSection>How to get started</PageSection>

                  <List>
                    <ListItem>Run / sync a Mainnet client pair</ListItem>
                    <ListItem>Dig around a block explorer:</ListItem>
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
                        </Link>{' '}
                        /{' '}
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
                    <ListItem>
                      Experiment with client APIs for single node statistics (i.e.{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://github.com/ethereum/beacon-APIs'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        beacon-APIs
                      </Link>{' '}
                      and{' '}
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
                        href='https://github.com/ethereum/execution-apis/'
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
                    <ListItem>Write new tools to gather data</ListItem>
                    <ListItem>Crunch some numbers and spin up some graphs</ListItem>
                    <ListItem>Publish your analysis or visualization!</ListItem>
                  </List>
                </Section>

                <Section id='existing-data' ref={ref10}>
                  <PageSection>Using existing data</PageSection>

                  <PageText>
                    Access to{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://github.com/ethpandaops/xatu'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      Xatu
                    </Link>{' '}
                    data is available on request via a clickhouse client. This data includes
                    captured{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://ethereum.github.io/beacon-APIs/#/Events/eventstream'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      Beacon API event stream
                    </Link>{' '}
                    and mempool events from multiple sentries in various continents.{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://dbt.platform.ethpandaops.io/#!/source/source.xatu.clickhouse.beacon_api_eth_v1_beacon_committee'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      Here
                    </Link>{' '}
                    is the list of tables available.
                  </PageText>
                </Section>

                <Section id='helpful-resources' ref={ref11}>
                  <PageSection>Helpful resources</PageSection>

                  <List>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://www.eip4844.com/'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        4844 Overview
                      </Link>
                    </ListItem>
                    <ListItem>Specs</ListItem>
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
                          href='https://eips.ethereum.org/EIPS/eip-4844'
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          EIP 4844
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
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        Dencun Mainnet Announcement
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
                        href='https://discord.gg/VmG7Uxc'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        Eth R&D
                      </Link>{' '}
                      Discord
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://blog.ethereum.org/2022/12/05/merge-data-challenge-results'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        Merge Data Challenge Results
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://blog.ethereum.org/2020/11/17/medalla-data-challenge-results'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        Medalla Data Challenge Results
                      </Link>
                    </ListItem>
                  </List>
                </Section>

                <Section id='support' ref={ref12}>
                  <PageSection>Support</PageSection>

                  <PageText>
                    For any general support questions about your submission, please email{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={`mailto:${GRANTS_EMAIL_ADDRESS}`}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      {GRANTS_EMAIL_ADDRESS}
                    </Link>
                    .
                  </PageText>
                </Section>

                <Section id='apply' ref={ref13}>
                  <Stack>
                    <ReadyToApply link={`${DATA_CHALLENGE_APPLY_URL}`} />
                  </Stack>
                </Section>
              </Stack>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default DataChallenge;
