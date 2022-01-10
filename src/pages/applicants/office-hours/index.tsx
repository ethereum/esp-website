import { Accordion, Link, ListItem, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import {
  FAQItem,
  List,
  PageSection,
  PageSubheading,
  PageText,
  StepArrow,
  StepHeader
} from '../../../components/UI';

import { WHAT_WE_SUPPORT_URL } from '../../../constants';

const OfficeHours: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Office Hours</title>
        <meta name='description' content='Office Hours' />
      </Head>

      <Stack mb={8}>
        <section id='description'>
          <PageSubheading mb={8}>Office Hours</PageSubheading>

          <PageText mb={6}>
            If you have questions before submitting a grant application, or need support other than
            funding, you can request a session with a member of the ESP team.
          </PageText>

          <PageText>Office Hours might be a good fit if you:</PageText>

          <Stack mb={6}>
            <List>
              <ListItem>
                Need non-financial support such as guidance or help identifying resources.
              </ListItem>
              <ListItem>
                Are considering applying for a grant and have questions or want to get feedback
                before submitting.
              </ListItem>
              <ListItem>
                Aren&apos;t sure whether your project fits within our scope and want to find out
                what kind of support might be available to you.
              </ListItem>
            </List>
          </Stack>

          <PageText>
            An office hours session is <strong>not</strong> an application for a grant or other
            formal support, or a chance to pitch your project. The purpose of these sessions is for
            us to provide answers or guidance so you can take your next steps with greater
            confidence - so focus on letting us know what you need, and giving us whatever context
            will help us understand your goals and challenges.
          </PageText>
        </section>
      </Stack>

      <Stack spacing={10}>
        <section id='process'>
          <PageSection mb={6}>Process</PageSection>

          <Stack spacing={5}>
            <Stack>
              <StepHeader>Request</StepHeader>

              <PageText>
                Submit the form on the next page to request an office hours appointment. We may
                contact you for clarification if your request appears to be out of scope.
              </PageText>

              <StepArrow />
            </Stack>

            <Stack>
              <StepHeader>Schedule</StepHeader>

              <PageText>
                If it seems like a fit, we&apos;ll get in touch to set up a time, then send you a
                calendar invite with a call link.
              </PageText>

              <StepArrow />
            </Stack>

            <Stack>
              <StepHeader>Prepare</StepHeader>

              <PageText>
                The more specific you are about what you need, the better we&apos;ll be able to help
                you! Read through the section below to make sure you understand what we can and
                can&apos;t do in these sessions.
              </PageText>

              <StepArrow />
            </Stack>

            <Stack>
              <StepHeader>Meet</StepHeader>

              <PageText>
                You&apos;ll have an informal 20-minute video call with a member of the ESP team.
              </PageText>
            </Stack>
          </Stack>
        </section>

        <section id='eligibility'>
          <PageSection mb={6}>Eligibility</PageSection>

          <PageText mb={6}>
            Our criteria for office hours are a bit more flexible than our requirements for grant
            funding. However, the projects we engage with during office hours should still fit
            within our general{' '}
            <Link
              fontWeight={700}
              color='brand.orange.100'
              href={WHAT_WE_SUPPORT_URL}
              _hover={{ textDecoration: 'none' }}
            >
              scope
            </Link>
            , and be beneficial to Ethereum in a way that aligns with the EF&apos;s{' '}
            <Link
              fontWeight={700}
              color='brand.orange.100'
              href='https://ethereum.foundation/philosophy/'
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              mission and philosophy
            </Link>
            .
          </PageText>

          <PageText>We are happy to hear from all kinds of contributors:</PageText>

          <List>
            <ListItem>Individuals, teams or organizations.</ListItem>
            <ListItem>
              Established projects, newcomers to Ethereum, past grantees or applicants.
            </ListItem>
            <ListItem>
              Projects at any point in the development process: just an idea, early stages, proof of
              concept, or with significant progress already made.
            </ListItem>
            <ListItem>Builders of any age, origin, identity or background.</ListItem>
          </List>
        </section>

        <section id='offered'>
          <PageSection mb={6}>What we offer</PageSection>

          <PageText mb={6}>
            Office Hours are a chance to connect directly with a member of the EF&apos;s Ecosystem
            Support team for support other than funding, including support with the process of
            submitting a grant application. Some common topics include:
          </PageText>

          <PageText fontWeight={700}>Guidance on submitting a grant application</PageText>
          <PageText mb={6}>
            If you&apos;re thinking about submitting a grant application, but feeling uncertain -
            whether about your eligibility, our evaluation criteria or anything else - reach out to
            us before submitting! The application process takes time (yours and ours) and we would
            rather get your questions answered before you start so the process goes as smoothly as
            possible.
          </PageText>

          <PageText fontWeight={700}>Project feedback or guidance</PageText>
          <PageText mb={6}>
            Whether you have a long-term goal of applying for a grant or just want to maximize your
            impact, we may be able to offer guidance such as idea validation, help thinking through
            a roadmap, or suggestions for how to refine your approach.
          </PageText>

          <PageText fontWeight={700}>Help navigating the Ethereum ecosystem</PageText>
          <PageText>
            We like to think we know the Ethereum ecosystem pretty well. If you&apos;re feeling
            lost, we may be able to help point you in the right direction by identifying resources
            you might not be aware of, other projects tackling similar problems, communities and
            events to consider participating in, or even other potential sources of funding.
          </PageText>
        </section>

        <section id='not-offered'>
          <PageSection mb={6}>What we DON&apos;T offer</PageSection>

          <List>
            <ListItem>Financial or legal advice.</ListItem>
            <ListItem>
              Advice on creating, structuring, launching, selling, or doing pretty much anything
              else with a token.
            </ListItem>
            <ListItem>Help with transactions, wallets or exchanges.</ListItem>
          </List>
        </section>

        <section id='before-submitting'>
          <PageSection mb={6}>Before submitting</PageSection>

          <PageText>Please check out these resources for answers to common inquiries:</PageText>

          <List>
            <ListItem>
              For information about Ethereum including staking, wallet and transaction basics, and
              developer resources:{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='https://ethereum.org'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                click here
              </Link>
              .
            </ListItem>
            <ListItem>
              If you&apos;re hiring or looking for employment:{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='https://ethereum.org/en/community/#ethereum-jobs'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                click here
              </Link>
              .
            </ListItem>
            <ListItem>
              If you&apos;re interested in working at the Ethereum Foundation:{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='https://ethereum.bamboohr.com/jobs/'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                click here
              </Link>
              .
            </ListItem>
            <ListItem>
              If you&apos;re interested in connecting with others with similar interests or in your
              local area,{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='https://ethereum.org/en/community/'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                check out here
              </Link>{' '}
              for Meetup groups, upcoming events, and online communities!.
            </ListItem>
            <ListItem>
              If you&apos;re exploring possible sources of funding:{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='https://ethereum.org/en/community/grants/#broad-ethereum-ecosystem'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                click here
              </Link>
              .
            </ListItem>
          </List>
        </section>

        <section id='faq'>
          <PageSection mb={6}>FAQ</PageSection>

          <Accordion allowToggle>
            <FAQItem question='Can I bring others to the call?'>
              <PageText>
                Yes! We&apos;ll send you a call invitation, and you&apos;re welcome to add people
                from your team; but we recommend no more than 4 since time is limited.
              </PageText>
            </FAQItem>

            <FAQItem question='How long will the call be?'>
              <PageText>The scheduled call will be 20 minutes long.</PageText>
            </FAQItem>

            <FAQItem question='How should I prepare?'>
              <PageText>
                Be as specific as possible about what you hope the ESP team can help you with, and
                write down questions or challenges that you&apos;d like to address. Don&apos;t plan
                on giving a presentation about your project - rather, use the submission form to
                introduce your project and give us any relevant context in advance so we can make
                the best use of the time.
              </PageText>
            </FAQItem>
          </Accordion>
        </section>
      </Stack>
    </>
  );
};

export default OfficeHours;
