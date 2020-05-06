import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage, injectIntl } from "gatsby-plugin-intl"

import SEO from "../components/seo"
import { useState } from "react"
import AccordionSection from "../components/accordion"
import {
  PageBody,
  PageHeader,
  H1,
  H2,
  HR,
  StyledLink,
  FakeLink,
} from "../components/SharedStyledComponents"

const FAQPage = ({ intl, data }) => {
  // TODO simplify w/ Array... couldn't get it working
  const [expanded, setExpanded] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
  })

  let areAnyOpen = false

  Object.keys(expanded).forEach(i => {
    if (expanded[i]) {
      areAnyOpen = true
    }
  })

  const toggleAll = () => {
    const newState = {}
    const newStateItem = areAnyOpen ? false : true
    Object.keys(expanded).forEach(i => {
      newState[i] = newStateItem
    })
    setExpanded(newState)
  }

  const toggleAllText = areAnyOpen
    ? intl.formatMessage({ id: "page-faq.collapse-all" })
    : intl.formatMessage({ id: "page-faq.expand-all" })

  return (
    <>
      <SEO
        lang={intl.locale}
        title={intl.formatMessage({ id: "page-faq.title" })}
      />
      <div>
        <PageHeader>
          <H1>
            <FormattedMessage id="page-faq.h1" />
          </H1>
        </PageHeader>
        <PageBody>
          <FakeLink onClick={toggleAll}>{toggleAllText}</FakeLink>
          <H2>
            <FormattedMessage id="page-faq.h2-program" />
          </H2>
          <HR />
          <AccordionSection
            key={0}
            i={0}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({ id: "page-faq.help.question" })}
          >
            <p>
              <FormattedMessage id="page-faq.help.answer-p-1" />
            </p>
            <p>
              <FormattedMessage id="page-faq.help.answer-p-2" />
            </p>
            <ul>
              <li>
                <FormattedMessage id="page-faq.help.answer-li-1" />
              </li>
              <li>
                <FormattedMessage id="page-faq.help.answer-li-2" />
              </li>
              <li>
                <FormattedMessage id="page-faq.help.answer-li-3" />
              </li>
              <li>
                <FormattedMessage id="page-faq.help.answer-li-4" />
              </li>
              <li>
                <FormattedMessage id="page-faq.help.answer-li-5" />
              </li>
              <li>
                <FormattedMessage id="page-faq.help.answer-li-6" />
              </li>
              <li>
                <FormattedMessage id="page-faq.help.answer-li-7" />
              </li>
              <li>
                <FormattedMessage id="page-faq.help.answer-li-8" />
              </li>
            </ul>
            <p>
              <FormattedMessage id="page-faq.help.answer-p-3" />
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={1}
            i={1}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Does the Ecosystem Support Program still give grants?"
          >
            <p>
              Yes! Awarding grants continues to be an important tool for us; but
              impact often takes more than just money, so we’ve expanded the
              range of support we provide. Our goal is to take an individual
              approach to each project, working together to establish realistic
              goals and offering support targeted to facilitate those goals.
            </p>
          </AccordionSection>
          <HR />
          <H2>Eligibility</H2>
          <HR />
          <AccordionSection
            key={3}
            i={3}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Who can apply?"
          >
            <p>
              We don’t accept grant applications directly through our website,
              but rather invite interested parties to get in touch through our{" "}
              <StyledLink to="/project/">inquiry form</StyledLink>. Newcomers to
              Ethereum, established projects, and past grantees are all welcome
              to submit an inquiry. Consider this inquiry the start of a
              conversation, and we’ll help you decide whether applying for a
              grant or other support is the right next step for you.
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={4}
            i={4}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Is anyone *not* eligible for the Ecosystem Support Program?"
          >
            <p>
              Anyone is welcome to apply for support, but the specific types of
              support available may vary. We typically provide grants funding
              for proposals that provide open-source software, research,
              community building or other contributions expected to have a
              positive impact on the ecosystem and community as a whole. We are
              happy to work with for-profit entities that are contributing to
              the Ethereum ecosystem, although clearly commercial projects
              (including any project that has recently raised or plans to raise
              ICO or venture investment) are likely to be better suited to
              receive non-financial support.
            </p>
            <p>
              Even if your overall project or business is not eligible for grant
              funding, it’s still worth getting in touch! We may be able to
              provide other types of assistance, and in some cases specific
              subcomponents or research challenges may be eligible for financial
              support.
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={5}
            i={5}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="What types of projects are you interested in?"
          >
            <p>Some areas we’ve focused on so far include:</p>
            <ul>
              <li>
                Research (e.g. cryptography, MPC computational models, privacy,
                proof systems, Eth2 challenges)
              </li>
              <li>
                Protocol improvements (e.g optimisations, contributions to
                sharding, light clients)
              </li>
              <li>L2 solutions (e.g. Plasma, State channels, Rollup)</li>
              <li>
                Community resources (e.g. documentation, tutorials, forums,
                groups, outreach)
              </li>
              <li>
                Open source tooling (e.g IDEs, testing tools, static analysis
                tools, debuggers)
              </li>
              <li>
                Public good infrastructure (e.g. messaging, storage, compute)
              </li>
              <li>Interoperability (e.g. with other protocols and services)</li>
              <li>Building blocks & Libraries</li>
            </ul>
            <p>
              More generally, we look for transformational concepts, broad
              impact, and initiatives that address clear needs in the ecosystem.
              Don’t feel constrained by these lists - thinking outside the box
              is encouraged!
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={6}
            i={6}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="What makes a good application?"
          >
            <p>
              While we don’t take grant applications directly through our
              website, thorough and thoughtful responses to the questions on our
              inquiry form can start the process off right. When submitting an
              inquiry, we want to know who you are, what you’re trying to do and
              what issues you’re facing.
            </p>
            <p>
              Adding detailed information to your inquiry will increase your
              chances of getting a useful and timely response. Some common
              causes of delay include:
            </p>
            <ul>
              <li>
                Unclear impact (insufficient focus on how your project would
                help the Ethereum ecosystem)
              </li>
              <li>
                Unclear project description (insufficient technical description
                of what you are building)
              </li>
              <li>
                Unclear needs/challenges (insufficient reflection on what stands
                between you and your goals)
              </li>
            </ul>
            <p>
              We need enough information to understand your goals, your
              motivation and your challenges. The more detail you provide at
              this stage, the more likely we’ll be able to help.
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={7}
            i={7}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Will you give me a million dollars?"
          >
            <p>
              Probably not. Grant sizes vary widely depending on the scope and
              expected length of the project - anywhere from $5,000 USD for an
              individual tackling a distinct task or research problem, to $200k+
              for dedicated Eth 2 client teams working on a multi-year timeline.
              Grant applicants will have the opportunity to work with the ESP
              team on determining an appropriate request based on the scope of
              their proposed work.
            </p>
          </AccordionSection>
          <HR />
          <H2>Application Process</H2>
          <HR />
          <AccordionSection
            key={8}
            i={8}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="What happens after an inquiry is submitted?"
          >
            <p>
              You’ll be assigned a guide, who will be a consistent point of
              contact to help you navigate the process. There will be an initial
              conversation and peer review to determine whether the program is a
              good fit for your project and what types of support might be most
              appropriate. If it seems like a fit, you’ll enter the next phase
              of formally applying for a grant, exploring other resources, or
              both. Whichever track(s) you embark on, your guide will be with
              you every step of the way. The more detail you provide in your
              initial inquiry, the smoother and quicker the process of
              determining next steps can go. See “What makes a good application”
              above for more on this.
            </p>
            <Img
              className="process-img"
              fluid={data.file.childImageSharp.fluid}
              alt="Ecosystem Support Program Process"
            />
          </AccordionSection>
          <HR />
          <AccordionSection
            key={9}
            i={9}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="How long will it take before I hear back from you?"
          >
            <p>
              You should hear from us within a few days of submitting your
              inquiry. If your inquiry progresses to a grant application, the
              overall process may take a few weeks to a few months depending on
              the scope and complexity of your project. You can help us move the
              process along by providing as much detail as possible in your
              initial inquiry (see "What makes a good application" above).
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={10}
            i={10}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Is my application confidential?"
          >
            <p>
              Any information you provide may be shared in the peer-review
              process, so let us know in your application if there's anything
              you want us to keep private!
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={11}
            i={11}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText="Can grants be paid out in ETH?"
          >
            <p>We can provide payment in ETH, DAI, or Fiat currency.</p>
          </AccordionSection>
          <HR />
        </PageBody>
      </div>
    </>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "esp-process.png" }) {
      childImageSharp {
        fluid(maxWidth: 540) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default injectIntl(FAQPage)
