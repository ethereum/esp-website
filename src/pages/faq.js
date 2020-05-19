import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

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

const FAQPage = ({ data }) => {
  const intl = useIntl()
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
      <SEO title={intl.formatMessage({ id: "page-faq.title" })} />
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
            headerText={intl.formatMessage({ id: "page-faq.grant.question" })}
          >
            <p>
              <FormattedMessage id="page-faq.grant.answer-p-1" />
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
            headerText={intl.formatMessage({
              id: "page-faq.eligibility.question",
            })}
          >
            <p>
              <FormattedMessage id="page-faq.eligibility.answer-p-1" />{" "}
              <StyledLink to={`${intl.locale}/project/`}>
                inquiry form
              </StyledLink>
              . <FormattedMessage id="page-faq.eligibility.answer-p-2" />
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={4}
            i={4}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-faq.eligibility-2.question",
            })}
          >
            <p>
              <FormattedMessage id="page-faq.eligibility-2.answer-p-1" />
            </p>
            <p>
              <FormattedMessage id="page-faq.eligibility-2.answer-p-2" />
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={5}
            i={5}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({ id: "page-faq.topics.question" })}
          >
            <p>
              <FormattedMessage id="page-faq.topics.answer-p-1" />
            </p>
            <ul>
              <li>
                <FormattedMessage id="page-faq.topics.answer-li-1" />
              </li>
              <li>
                <FormattedMessage id="page-faq.topics.answer-li-2" />
              </li>
              <li>
                <FormattedMessage id="page-faq.topics.answer-li-3" />
              </li>
              <li>
                <FormattedMessage id="page-faq.topics.answer-li-4" />
              </li>
              <li>
                <FormattedMessage id="page-faq.topics.answer-li-5" />
              </li>
              <li>
                <FormattedMessage id="page-faq.topics.answer-li-6" />
              </li>
              <li>
                <FormattedMessage id="page-faq.topics.answer-li-7" />
              </li>
              <li>
                <FormattedMessage id="page-faq.topics.answer-li-8" />
              </li>
            </ul>
            <p>
              <FormattedMessage id="page-faq.topics.answer-p-2" />
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={6}
            i={6}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-faq.applications.question",
            })}
          >
            <p>
              <FormattedMessage id="page-faq.applications.answer-p-1" />
            </p>
            <p>
              <FormattedMessage id="page-faq.applications.answer-p-2" />
            </p>
            <ul>
              <li>
                <FormattedMessage id="page-faq.applications.answer-li-1" />
              </li>
              <li>
                <FormattedMessage id="page-faq.applications.answer-li-2" />
              </li>
              <li>
                <FormattedMessage id="page-faq.applications.answer-li-3" />
              </li>
            </ul>
            <p>
              <FormattedMessage id="page-faq.applications.answer-p-3" />
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={7}
            i={7}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-faq.millions.question",
            })}
          >
            <p>
              <FormattedMessage id="page-faq.millions.answer-p-1" />
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
            headerText={intl.formatMessage({
              id: "page-faq.application-process.question",
            })}
          >
            <p>
              <FormattedMessage id="page-faq.application-process.answer-p-1" />
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
            headerText={intl.formatMessage({
              id: "page-faq.response-time.question",
            })}
          >
            <p>
              <FormattedMessage id="page-faq.response-time.answer-p-1" />
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={10}
            i={10}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-faq.confidentiality.question",
            })}
          >
            <p>
              <FormattedMessage id="page-faq.confidentiality.answer-p-1" />
            </p>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={11}
            i={11}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({ id: "page-faq.payment.question" })}
          >
            <p>
              <FormattedMessage id="page-faq.payment.answer-p-1" />
            </p>
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

export default FAQPage
