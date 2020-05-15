import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
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
  FakeLink,
} from "../components/SharedStyledComponents"
import { colorGrayDark } from "../utils/styles"

const Item = styled.div`
  border-left: 3px solid ${colorGrayDark};
  padding-left: 24px;
  margin-left: 1.45rem;
  margin-right: 1.45rem;
  margin-bottom: 1.45rem;
`

const StyledFakeLink = styled(FakeLink)`
  margin-bottom: 1.45rem;
`

const UL = styled.ul`
  margin-top: 0.5rem;
`

const WishlistPage = () => {
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
    ? intl.formatMessage({ id: "page-wishlist.collapse-all" })
    : intl.formatMessage({ id: "page-wishlist.expand-all" })

  return (
    <>
      <SEO title={intl.formatMessage({ id: "page-wishlist.title" })} />
      <div>
        <PageHeader>
          <H1>
            <FormattedMessage id="page-wishlist.h1" />
          </H1>
        </PageHeader>
        <PageBody>
          <H2>
            <FormattedMessage id="page-wishlist.h2" />
          </H2>
          <p>
            <FormattedMessage id="page-wishlist.h2-description" />{" "}
            <Link to="/project/">
              <FormattedMessage id="page-wishlist.h2-description-link" />
            </Link>
            !
          </p>
          <StyledFakeLink onClick={toggleAll}>{toggleAllText}</StyledFakeLink>
          <HR />
          <AccordionSection
            key={0}
            i={0}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-wishlist.h2-capabilities.capabilities",
            })}
          >
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-capabilities.storage" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-capabilities.answer-p-1" />
                <UL>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-1" />{" "}
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-2" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-3" />
                  </li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-capabilities.communications" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-capabilities.comm-info" />
                <UL>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-4" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-5" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-6" />
                  </li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-capabilities.infrastructure" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-capabilities.infra-info" />
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-capabilities.identity" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-capabilities.id-info" />
                <UL>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-7" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-8" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-9" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-10" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-10" />
                  </li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-capabilities.integration" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-capabilities.integration-info" />

                <UL>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-12" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-13" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-14" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-capabilities.answer-li-15" />
                  </li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-capabilities.light-clients" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-capabilities.answer-d-1" />
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={1}
            i={1}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-wishlist.h2-privacy.privacy",
            })}
          >
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-privacy.communications-2" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-privacy.comm-info-2" />
                <UL>
                  <FormattedMessage id="page-wishlist.h2-privacy.answer-li-16" />
                  <li>
                    <FormattedMessage id="page-wishlist.h2-privacy.answer-li-17" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-privacy.answer-li-18" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-privacy.answer-li-19" />
                  </li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-privacy.execution" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-privacy.execution-info" />
                <UL>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-privacy.answer-li-20" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-privacy.answer-li-21" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-privacy.answer-li-22" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-privacy.answer-li-23" />
                  </li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-privacy.cryptography" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-privacy.cryptography-info" />
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={2}
            i={2}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-wishlist.h2-security.security",
            })}
          >
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-security.smart-contracts" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-security.smart-contract-info" />
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-security.game-theory" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-security.game-theory-info" />
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-security.monitoring" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-security.monitoring-info" />
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={3}
            i={3}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-wishlist.h2-usability.usability",
            })}
          >
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-usability.friction-reduction" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-usability.answer-d-1" />
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-usability.mgmt" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-usability.mgmt-info" />
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={4}
            i={4}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-wishlist.h2-dev-exp.dev-exp",
            })}
          >
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-dev-exp.dec-infra" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-dev-exp.dec-infra-info" />
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-dev-exp.dec-infra-info" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-dev-exp.tooling-info" />
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-dev-exp.contract-security" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-dev-exp.contract-security-info" />
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-dev-exp.monitoring-tools" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-dev-exp.monitoring-tools-info" />
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={5}
            i={5}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-wishlist.h2-edu-comm.edu-comm",
            })}
          >
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-edu-comm.edu-materials" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-edu-comm.edu-materials-info" />
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-edu-comm.translation" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-edu-comm.translation-info" />
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-edu-comm.events" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-edu-comm.events-info" />
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={6}
            i={6}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-wishlist.h2-scaling.scaling",
            })}
          >
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-scaling.cryptography" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-scaling.cryptography-info" />
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-scaling.l2-scaling" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-scaling.l2-info" />
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={7}
            i={7}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-wishlist.h2-eth1x.eth1x",
            })}
          >
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-eth1x.stateless" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-eth1x.stateless-info" />
                <UL>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth1x.answer-li-1" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth1x.answer-li-2" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth1x.answer-li-3" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth1x.answer-li-4" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth1x.answer-li-5" />
                  </li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-eth1x.optimization" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-eth1x.optimization-info" />
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={8}
            i={8}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-wishlist.h2-eth2.eth2",
            })}
          >
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-eth2.confidential" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-eth2.confidential-info" />
                <UL>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth2.answer-li-1" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth2.answer-li-2" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth2.answer-li-3" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth2.answer-li-4" />
                  </li>
                </UL>
              </div>
            </Item>
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-eth2.stateless-eth2" />
              </strong>
              <div>
                <FormattedMessage id="page-wishlist.h2-eth2.stateless-eth2-info" />
                <UL>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth2.answer-li-5" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth2.answer-li-6" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth2.answer-li-7" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth2.answer-li-8" />
                  </li>
                  <li>
                    <FormattedMessage id="page-wishlist.h2-eth2.answer-li-9" />
                  </li>
                </UL>
              </div>
            </Item>
          </AccordionSection>
          <HR />
          <AccordionSection
            key={9}
            i={9}
            expanded={expanded}
            setExpanded={setExpanded}
            headerText={intl.formatMessage({
              id: "page-wishlist.h2-innovate.innovate",
            })}
          >
            <Item>
              <strong>
                <FormattedMessage id="page-wishlist.h2-innovate.innovate-info" />
              </strong>
              <div></div>
            </Item>
          </AccordionSection>
          <HR />
        </PageBody>
      </div>
    </>
  )
}

export default WishlistPage
