import { Accordion, Box, Flex, Link, ListItem, Stack, Text } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  ApplicationAttentionMsg,
  FAQItem,
  List,
  PageMetadata,
  PageSection,
  PageSubheading,
  PageText,
  ProcessStep,
  ReadyToApply
} from '../../components/UI';

import {
  GRANTS_EMAIL_ADDRESS,
  ETHEREUM_COMMUNITY_URL,
  ETHEREUM_GRANTS_URL,
  ETHRESEARCH_URL,
  RUN_A_NODE_GRANTS_APPLY_URL,
  SIDEBAR_RUN_A_NODE__GRANTS_LINKS
} from '../../constants';

const RunANodeGrants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.5, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false });
  const [ref8, inView8] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Run A Node Grants'
        description='The Ethereum Foundation is calling for proposals to expand the diversity of nodes within its network'
      />

      <Box bg='white' position='relative' mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={12}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_RUN_A_NODE__GRANTS_LINKS}
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
              <Stack spacing={10}>
                <section id='summary' ref={ref}>
                  <PageText mb={6}>
                    <Text as='i'>
                      Starting on <Text as='strong'>June 7, 2023</Text>, we will begin to accept
                      proposals.
                    </Text>
                  </PageText>

                  <PageText mb={6}>
                    <Text as='strong'>Deadline: July 20, 2023</Text>
                  </PageText>

                  <PageText mb={6}>
                    <Text as='i'>
                      All of the details you&apos;ll need to apply can be found below.
                    </Text>
                  </PageText>
                </section>

                <section id='introduction' ref={ref}>
                  <PageSection mb={6}>Introduction</PageSection>

                  <List>
                    <ListItem>
                      The Ethereum Foundation is launching a new funding round to encourage the
                      diversification of Ethereum nodes.
                    </ListItem>
                    <ListItem>
                      Running a node on Ethereum provides increased security, access, control, and
                      flexibility and allows you to participate in and contribute to the Ethereum
                      network actively.
                    </ListItem>
                    <ListItem>
                      Nodes are a critical element of Ethereum, and we are looking for creative
                      proposals from a diverse range of users looking to run a node. You may be
                      based in a different geographical region; perhaps you want your university to
                      use a node for research purposes - surprise us with your application.
                    </ListItem>
                    <ListItem>
                      Selected applicants will receive either a{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://dappnode.com/'
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                      >
                        Dappnode
                      </Link>{' '}
                      sent directly to you or a fixed allocated sum to reimburse the cost of the
                      hardware.
                    </ListItem>
                  </List>
                </section>

                <section id='why-run-a-node' ref={ref2}>
                  <PageSection mb={6}>Why Run a Node?</PageSection>

                  <PageText mb={6}>
                    We want you to be creative and demonstrate why you want to run a node for the
                    Ethereum ecosystem. This list is to inspire you:
                  </PageText>

                  <List>
                    <ListItem>
                      Based in a remote location and want to test the node performance
                    </ListItem>
                    <ListItem>
                      Create a node set up guide or tutorial for other first time hosts.
                    </ListItem>
                    <ListItem>
                      Test all the different clients and build a dashboard of benchmarks.
                    </ListItem>
                    <ListItem>
                      Allow other developers and users in the Ethereum community to query indexed
                      data on their nodes for research purposes.
                    </ListItem>
                    <ListItem>
                      Help preserve access to Ethereum for others in your community.
                    </ListItem>
                    <ListItem>
                      Host various services that rely on data from Ethereum on your server. Examples
                      of such services include Beacon Chain validators, layer 2 software,
                      infrastructure, block explorers, payment processors, and more.
                    </ListItem>
                    <ListItem>
                      Connect with your node through Inter-process Communications (IPC) or modify
                      the node to incorporate your program as a plugin. This approach provides low
                      latency, particularly useful when working with web3 libraries and replacing
                      transactions quickly (such as when front-running).
                    </ListItem>
                    <ListItem>
                      Offer customized RPC endpoints that can be accessed publicly by the community
                      or privately hosted for Ethereum users. This enables people to utilize your
                      node and avoid relying on centralized providers.
                    </ListItem>
                  </List>
                </section>

                <section id='eligibility-and-requirements' ref={ref3}>
                  <PageSection mb={6}>Eligibility & Requirements</PageSection>

                  <List>
                    <ListItem>Anyone interested in running a node is eligible to apply.</ListItem>
                    <ListItem>
                      This is open to individuals, teams, and institutions from all parts of the
                      world; preference given to applicants in remote locations.
                    </ListItem>
                    <ListItem>
                      Applicants will be responsible for paying any customs incurred if they select
                      to receive hardware.
                    </ListItem>
                    <ListItem>
                      Must have a fast, stable internet connection with high data thresholds.{' '}
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://www.speedtest.net/'
                        isExternal
                      >
                        Test your internet connection
                      </Link>
                    </ListItem>
                    <ListItem>
                      Must be able to demonstrate technical competency of nodes and clients.
                    </ListItem>
                    <ListItem>
                      Must be willing and able to run the node for at least 2 years.
                    </ListItem>
                    <ListItem>Required to submit Ethereum Node Records.</ListItem>
                    <ListItem>Node cannot be located in data center or cloud.</ListItem>
                  </List>
                </section>

                <section id='deadlines' ref={ref4}>
                  <PageSection mb={6}>Deadlines</PageSection>

                  <PageText mb={6}>
                    Application window: <b>June 7 - June 20</b>
                  </PageText>

                  <PageText mb={6}>
                    Evaluation window: <b>June 20 - July 15</b>
                  </PageText>

                  <PageText mb={6}>
                    Expect final decisions by <b>July 15</b>
                  </PageText>

                  <PageText mb={6}>
                    Node launch and ENR submission deadline: <b>September 1, 2023</b>
                  </PageText>
                </section>

                <section id='application-details' ref={ref5}>
                  <PageSection mb={6}>Application Details</PageSection>

                  <PageText mb={6}>Use the webform to complete the application.</PageText>

                  <List>
                    <ListItem>
                      Submissions must be complete and in English to be considered.
                    </ListItem>
                    <ListItem>
                      Applicants must specify whether they would like hardware mailed to their house
                      or a stipend to reimburse the costs of buying hardware locally, or doing a
                      custom build.
                    </ListItem>
                    <ListItem>
                      Applicants are required to provide details about their understanding of nodes
                      and clients.
                    </ListItem>
                    <ListItem>
                      Applicants must detail their intended output for the Ethereum ecosystem by
                      running a node and how they will share this impact with the community.
                    </ListItem>
                  </List>
                </section>

                <section id='helpful-resources' ref={ref6}>
                  <PageSection mb={6}>Helpful Resources</PageSection>

                  <List>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://docs.dappnode.io/user/faq/general/'
                        isExternal
                      >
                        Dappnode FAQ
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://ethereum.org/en/developers/docs/nodes-and-clients/'
                        isExternal
                      >
                        Ethereum Nodes and Clients
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://nodewatch.io'
                        isExternal
                      >
                        NodeWatch
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://ethernodes.org'
                        isExternal
                      >
                        EtherNodes
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        fontWeight={700}
                        color='brand.orange.100'
                        href='https://panarama.xyz'
                        isExternal
                      >
                        Panarama
                      </Link>
                    </ListItem>
                  </List>
                </section>

                <section id='next-steps-and-support' ref={ref7}>
                  <PageSection mb={6}>Next steps and support</PageSection>

                  <PageText mb={6}>
                    For general support questions about your submission, please email PGR INBOX or{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={`mailto:${GRANTS_EMAIL_ADDRESS}`}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      {GRANTS_EMAIL_ADDRESS}
                    </Link>
                  </PageText>
                </section>

                <section id='apply' ref={ref8}>
                  <Stack mt={6}>
                    <ReadyToApply link={`${RUN_A_NODE_GRANTS_APPLY_URL}`} />
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

export default RunANodeGrants;
