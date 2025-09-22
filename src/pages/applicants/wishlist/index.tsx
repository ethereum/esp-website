import { Accordion, Box, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
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

import { SIDEBAR_WISHLIST_LINKS, WISHLIST_APPLY_URL, ESP_EMAIL_ADDRESS } from '../../../constants';

const Wishlist: NextPage = () => {
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
        title='Wishlist Applications'
        description='Apply to work on specific projects and initiatives that the Ethereum ecosystem needs most.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar
            sidebarLinks={SIDEBAR_WISHLIST_LINKS}
            sectionsInView={[inView, inView2, inView3, inView4, inView5, inView6, inView7]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack mb={8}>
              <section id='description' ref={ref}>
                <PageSubheading mb={8}>Wishlist Applications</PageSubheading>

                <PageText>
                  The Wishlist is a curated collection of specific projects and initiatives that the
                  Ethereum ecosystem needs most. These are concrete opportunities where your skills
                  and expertise can make a significant impact on Ethereum&apos;s development and
                  growth.
                </PageText>
              </section>
            </Stack>

            <Stack spacing={10}>
              <section id='what-are-wishlist-items' ref={ref2}>
                <PageSection mb={6}>What are wishlist items?</PageSection>

                <PageText mb={6}>
                  Wishlist items are specific projects, tools, research initiatives, or other
                  contributions that the Ethereum Foundation has identified as high-priority needs
                  for the ecosystem. Each item includes:
                </PageText>

                <List>
                  <ListItem>Clear project specifications and expected deliverables</ListItem>
                  <ListItem>Estimated timeline and effort requirements</ListItem>
                  <ListItem>Skills and expertise needed</ListItem>
                  <ListItem>Impact on the Ethereum ecosystem</ListItem>
                  <ListItem>Guidance and support available</ListItem>
                </List>

                <PageText mt={6}>
                  These items are continuously updated based on ecosystem needs, community feedback,
                  and strategic priorities.
                </PageText>
              </section>

              <section id='how-it-works' ref={ref3}>
                <PageSection mb={6}>How it works</PageSection>

                <Stack spacing={3}>
                  <ProcessStep title='Browse'>
                    Browse the available wishlist items and find one that matches your interests and
                    expertise. Each item includes detailed specifications and requirements.
                  </ProcessStep>

                  <ProcessStep title='Apply'>
                    Submit your application explaining how you plan to address the wishlist item,
                    your relevant experience, and your proposed approach and timeline.
                  </ProcessStep>

                  <ProcessStep title='Review'>
                    The ESP team reviews your application considering your fit for the project,
                    proposed approach, and potential impact. We may contact you for clarification or
                    additional information.
                  </ProcessStep>

                  <ProcessStep title='Decision'>
                    If selected, we&apos;ll work with you to finalize project details, timeline,
                    funding amount, and success metrics. Not all applications will be accepted.
                  </ProcessStep>

                  <ProcessStep title='Execute' isLastStep>
                    Begin work on your project with ongoing support from the ESP team. Regular
                    check-ins and milestone reviews help ensure project success.
                  </ProcessStep>
                </Stack>
              </section>

              <section id='eligibility' ref={ref4}>
                <PageSection mb={6}>Eligibility</PageSection>

                <PageText mb={6}>
                  Wishlist applications are open to individuals, teams, and organizations with the
                  skills and experience needed to successfully deliver on the selected item. We
                  consider:
                </PageText>

                <List>
                  <ListItem>
                    <strong>Relevant expertise:</strong> Technical skills, domain knowledge, or
                    experience that directly relates to the wishlist item
                  </ListItem>
                  <ListItem>
                    <strong>Track record:</strong> Previous work, projects, or contributions that
                    demonstrate your ability to deliver quality results
                  </ListItem>
                  <ListItem>
                    <strong>Commitment:</strong> Availability and dedication to complete the project
                    within the proposed timeline
                  </ListItem>
                  <ListItem>
                    <strong>Alignment:</strong> Understanding of Ethereum&apos;s values and
                    ecosystem needs
                  </ListItem>
                </List>

                <PageText mt={6}>
                  Both newcomers and established contributors are welcome to apply, as long as they
                  can demonstrate the capability to deliver on their selected wishlist item.
                </PageText>
              </section>

              <section id='selection-criteria' ref={ref5}>
                <PageSection mb={6}>Selection criteria</PageSection>

                <PageText mb={6}>Applications are evaluated based on several factors:</PageText>

                <List>
                  <ListItem>
                    <strong>Technical approach:</strong> Soundness and feasibility of your proposed
                    methodology and implementation plan
                  </ListItem>
                  <ListItem>
                    <strong>Experience and qualifications:</strong> Relevant background, skills, and
                    previous work that demonstrates capability
                  </ListItem>
                  <ListItem>
                    <strong>Project understanding:</strong> Clear comprehension of the wishlist item
                    requirements and expected outcomes
                  </ListItem>
                  <ListItem>
                    <strong>Timeline and deliverables:</strong> Realistic project schedule with
                    clear milestones and deliverables
                  </ListItem>
                  <ListItem>
                    <strong>Ecosystem impact:</strong> Potential benefit to the Ethereum community
                    and alignment with ecosystem priorities
                  </ListItem>
                  <ListItem>
                    <strong>Budget reasonableness:</strong> Cost-effectiveness and appropriate
                    resource allocation
                  </ListItem>
                </List>
              </section>

              <section id='faq' ref={ref6}>
                <PageSection mb={6}>FAQ</PageSection>

                <Accordion allowToggle>
                  <FAQItem question='Can I apply for multiple wishlist items?'>
                    <PageText>
                      You can apply for multiple items, but we recommend focusing on those that best
                      match your expertise. If applying for multiple items, please submit separate
                      applications for each.
                    </PageText>
                  </FAQItem>

                  <FAQItem question="What if my approach differs from what's described?">
                    <PageText>
                      While wishlist items include suggested approaches, we welcome innovative
                      solutions. Clearly explain your alternative approach and why you believe it
                      would be more effective.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='How are wishlist items different from regular grants?'>
                    <PageText>
                      Wishlist items are specifically defined projects that address known ecosystem
                      needs, while regular grants are open to any project proposal. Wishlist
                      applications follow the outlined specifications but allow for innovative
                      implementation approaches.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='What support is available during the project?'>
                    <PageText>
                      Selected applicants receive guidance from ESP team members, access to relevant
                      experts in the ecosystem, and regular check-ins to ensure project progress and
                      address any challenges.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='What happens if I cannot complete the project?'>
                    <PageText>
                      We understand that circumstances can change. If you encounter difficulties,
                      contact us immediately. We may be able to provide additional support, adjust
                      timelines, or in some cases, modify project scope.
                    </PageText>
                  </FAQItem>

                  <FAQItem question='How often are new wishlist items added?'>
                    <PageText>
                      Wishlist items are added regularly based on ecosystem needs and strategic
                      priorities. We recommend checking back periodically or subscribing to our
                      newsletter for updates on new opportunities.
                    </PageText>
                  </FAQItem>
                </Accordion>
              </section>

              <section id='apply' ref={ref7}>
                <Stack mt={6}>
                  <ReadyToApply link={`${WISHLIST_APPLY_URL}`} />
                </Stack>
              </section>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Wishlist;
