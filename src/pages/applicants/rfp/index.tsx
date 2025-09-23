import { Accordion, Box, Flex, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  FAQItem,
  List,
  PageSection,
  PageSubheading,
  PageText,
  ProcessStep,
  PageMetadata,
  ReadyToApply
} from '../../../components/UI';

import { SIDEBAR_RFP_LINKS, RFP_APPLY_URL } from '../../../constants';

const RFP: NextPage = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.5, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Request for Proposals (RFPs)'
        description='Apply for targeted research and development projects that address specific needs in the Ethereum ecosystem.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar
            sidebarLinks={SIDEBAR_RFP_LINKS}
            sectionsInView={[inView, inView2, inView3, inView4, inView5, inView6, inView7]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack mb={8}>
              <section id='description' ref={ref}>
                <PageSubheading mb={8}>Request for Proposals (RFPs)</PageSubheading>

                <PageText>
                  Request for Proposals (RFPs) are targeted solicitations for specific research,
                  development, or implementation work that addresses identified needs within the
                  Ethereum ecosystem. Unlike open-ended grant applications, RFPs define specific
                  objectives, requirements, and expected deliverables.
                </PageText>
              </section>
            </Stack>

            <Stack spacing={10}>
              <section id='what-are-rfps' ref={ref2}>
                <PageSection mb={6}>What are RFPs?</PageSection>

                <PageText mb={6}>
                  Request for Proposals are formal invitations for qualified teams and individuals
                  to submit proposals for specific projects that have been identified as ecosystem
                  priorities. RFPs typically include:
                </PageText>

                <List>
                  <ListItem>Clear project specifications and technical requirements</ListItem>
                  <ListItem>Expected deliverables and milestones</ListItem>
                  <ListItem>Skills, experience, and qualifications needed</ListItem>
                  <ListItem>Timeline and budget guidance</ListItem>
                  <ListItem>Evaluation criteria and selection process</ListItem>
                </List>

                <PageText mt={6}>
                  Each RFP represents a strategic priority area where the Ethereum Foundation seeks
                  specialized expertise to advance the ecosystem.
                </PageText>
              </section>

              <section id='how-it-works' ref={ref3}>
                <PageSection mb={6}>How it works</PageSection>

                <Stack spacing={3}>
                  <ProcessStep title='Browse'>
                    Review active requests for proposals that match your expertise and interests.
                    Each RFP includes detailed specifications, requirements, and expected
                    deliverables.
                  </ProcessStep>

                  <ProcessStep title='Prepare'>
                    Create a comprehensive PDF proposal addressing all requirements, including
                    technical approach, timeline, budget breakdown, team qualifications, and risk
                    assessment.
                  </ProcessStep>

                  <ProcessStep title='Submit'>
                    Complete the application form and upload your proposal. Ensure all required
                    information is provided and accurately reflects your capabilities.
                  </ProcessStep>

                  <ProcessStep title='Evaluation'>
                    Our team reviews proposals against specified criteria. Some RFPs may include
                    multiple evaluation rounds or require presentations from shortlisted candidates.
                  </ProcessStep>

                  <ProcessStep title='Contract' isLastStep>
                    Selected teams are contacted for contract negotiations and project initiation.
                    Clear expectations, deliverables, and timelines are established.
                  </ProcessStep>
                </Stack>
              </section>

              <section id='eligibility' ref={ref4}>
                <PageSection mb={6}>Eligibility</PageSection>

                <PageText mb={6}>
                  RFP applications are open to individuals, teams, companies, and organizations
                  worldwide with the expertise needed to successfully deliver on the specified
                  requirements. We look for:
                </PageText>

                <List>
                  <ListItem>
                    <strong>Domain expertise:</strong> Demonstrated knowledge and experience in the
                    specific technical area or research domain
                  </ListItem>
                  <ListItem>
                    <strong>Proven track record:</strong> Previous work or projects that showcase
                    ability to deliver quality results within scope and timeline
                  </ListItem>
                  <ListItem>
                    <strong>Technical capability:</strong> Skills and resources necessary to meet
                    the RFP&apos;s technical requirements and standards
                  </ListItem>
                  <ListItem>
                    <strong>Project commitment:</strong> Availability and dedication to complete the
                    project according to agreed specifications
                  </ListItem>
                </List>
              </section>

              <section id='selection-criteria' ref={ref5}>
                <PageSection mb={6}>Selection criteria</PageSection>

                <PageText mb={6}>
                  RFP proposals are evaluated based on several key factors:
                </PageText>

                <List>
                  <ListItem>
                    <strong>Technical approach:</strong> Quality, feasibility, and innovation of the
                    proposed solution methodology
                  </ListItem>
                  <ListItem>
                    <strong>Team expertise:</strong> Relevant experience, qualifications, and track
                    record of the proposed team members
                  </ListItem>
                  <ListItem>
                    <strong>Project plan:</strong> Clear timeline with realistic milestones and
                    well-defined deliverables
                  </ListItem>
                  <ListItem>
                    <strong>Budget justification:</strong> Reasonable cost structure and appropriate
                    resource allocation for the scope of work
                  </ListItem>
                  <ListItem>
                    <strong>Impact potential:</strong> Expected contribution to the Ethereum
                    ecosystem and alignment with strategic priorities
                  </ListItem>
                  <ListItem>
                    <strong>Risk management:</strong> Identification of potential challenges and
                    proposed mitigation strategies
                  </ListItem>
                </List>
              </section>

              <section id='faq' ref={ref6}>
                <PageSection mb={6}>FAQ</PageSection>

                <Accordion allowToggle>
                  <FAQItem question='How are RFPs different from regular grant applications?'>
                    <PageText>
                      RFPs are targeted requests for specific projects with defined requirements,
                      while grant applications are more open-ended. RFPs include detailed
                      specifications, expected deliverables, and evaluation criteria upfront.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='Can I apply for multiple RFPs simultaneously?'>
                    <PageText>
                      Yes, you can apply for multiple RFPs if you have the capacity and expertise to
                      handle multiple projects. Each application should be tailored to the specific
                      RFP requirements.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='What should be included in the PDF proposal?'>
                    <PageText>
                      Your proposal should address all requirements listed in the RFP, including
                      technical approach, timeline, budget breakdown, team qualifications, risk
                      assessment, and expected deliverables. Follow any specific formatting
                      guidelines provided.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='How long does the evaluation process take?'>
                    <PageText>
                      The evaluation timeline varies by RFP complexity, typically ranging from 4-8
                      weeks. Some RFPs may include multiple evaluation rounds or require
                      presentations from shortlisted candidates.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='Are collaborative proposals encouraged?'>
                    <PageText>
                      Collaborative proposals are welcome when they bring together complementary
                      expertise. Clearly define each party&apos;s roles, responsibilities, and
                      contribution to the project in your proposal.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='What happens if my proposal is not selected?'>
                    <PageText>
                      Due to the volume of applications, we cannot provide individual feedback on
                      unsuccessful proposals. However, we encourage you to apply for future RFPs
                      that match your expertise and to consider other funding opportunities we
                      offer.
                    </PageText>
                  </FAQItem>
                </Accordion>
              </section>

              <section id='apply' ref={ref7}>
                <Stack mt={6}>
                  <ReadyToApply link={`${RFP_APPLY_URL}`} />
                </Stack>
              </section>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default RFP;
