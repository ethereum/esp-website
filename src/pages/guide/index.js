import React from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import GuideNav from "../../components/GuideNav"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import {
  H1,
  H2,
  PageBodyWide,
  PageHeader,
  Section,
} from "../../components/SharedStyledComponents"
import {
  colorOrange,
  colorOrangeLightest,
  colorWhite,
} from "../../utils/styles"

const PageBody = styled(PageBodyWide)`
  display: flex;
`
const MainContent = styled.div``

const LightestOrangeContainer = styled.div`
  display: flex;
  background-color: ${colorOrangeLightest};
  padding: 24px;
`

const List = styled.ul`
  margin-bottom: 0;
  flex: 1 1 50%;
`

const Disclaimer = styled.p`
  opacity: 0.6;
  font-size: 0.8rem;
`

const ProcessContainer = styled.div`
  background-color: ${colorOrangeLightest};
  padding: 24px;
`
const ProcessItem = styled.div`
  display: flex;
`
const StyledProcessItemChart = styled.div`
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
`
const ItemCell = styled.div`
  height: 84px;
  font-weight: bold;
  background: ${colorWhite};
  margin: 1rem;
  padding: 1rem;
  border: 1px solid ${colorOrange};

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ItemArrowContainer = styled.div`
  width: 100%;
  height: 100%;
  border-left: 2px dotted ${colorOrange};
  margin-left: 50%; /* TODO better way */
  position: relative;
`
const StyledArrow = styled(FontAwesomeIcon)`
  color: ${colorOrange};
  position: absolute;
  bottom: -12px;
  right: calc(100% - 6px);
`

const ItemDescription = styled.div`
  margin: 1rem;
`

const ProcessItemChart = ({ text, shouldDisplayArrow = true }) => {
  return (
    <StyledProcessItemChart>
      <ItemCell>{text}</ItemCell>
      {shouldDisplayArrow && (
        <ItemArrowContainer>
          <StyledArrow icon={faChevronDown} />
        </ItemArrowContainer>
      )}
    </StyledProcessItemChart>
  )
}

const GuidePage = () => {
  const intl = useIntl()

  return (
    <>
      <PageMetadata title={intl.formatMessage({ id: "page-about.title" })} />
      <div>
        <PageHeader>
          <H1>Guide to ESP</H1>
        </PageHeader>
        <PageBody>
          <GuideNav />
          <MainContent>
            <Section>
              <H2>About This Guide</H2>
              <p>
                This guide is intended to help you understand how we evaluate
                and make decisions about ESP inquiries. Whether you’re
                considering reaching out for support, have already submitted an
                inquiry and want information on what to expect, or just want to
                understand more about how ESP works, this guide is for you. It's
                meant to be a resource, not an instruction manual - feel free to
                read whatever you think applies to you and ignore the rest.
              </p>
              <p>
                This guide is, and will always be, a work in progress. If you
                think something is missing or unclear, or have suggestions for
                how we can improve, we’re open to feedback!
              </p>
            </Section>
            <Section>
              <H2>What We Do</H2>
              <p>
                The Ecosystem Support Program evolved from the original Ethereum
                Grants program, but ESP is about much more than grants. Our
                process is designed to be flexible and personalized - we aim to
                connect the projects we support with a broad range of resources,
                and we're always looking for new ways to support Ethereum's
                builders.
              </p>
              <p>
                Although we're happy to consider many types of projects for
                support, we do have some minimum requirements for traditional
                grant funding. To be considered for a grant, a project needs to
                be open source and beneficial to Ethereum; and we most often
                focus on universal tools, infrastructure, research or other
                common resources.
              </p>
              <h3>The work we support is NOT:</h3>
              <LightestOrangeContainer>
                <List>
                  <li>Proprietary</li>
                  <li>Related to a recent or upcoming ICO</li>
                  <li>Designed for a zero-sum outcome</li>
                </List>
              </LightestOrangeContainer>
            </Section>
            <Section>
              <H2>Who Should Apply</H2>
              <p>
                We're open to supporting work from people and teams of all
                kinds, including (but not limited to):
              </p>
              <LightestOrangeContainer>
                <List>
                  <li>Developers</li>
                  <li>Independent teams</li>
                  <li>Nonprofits or companies*</li>
                </List>
                <List>
                  <li>Researchers</li>
                  <li>Academics</li>
                  <li>Community organizers</li>
                </List>
              </LightestOrangeContainer>
              <br />
              <p>
                Our inquiry process is open to veterans and newbies alike.
                Whatever your level of familiarity or stage of development,
                we'll start the conversation by meeting you where you are, and
                try to help you find ways to grow your contribution over time.{" "}
              </p>
              <Disclaimer>
                *While we don't fund revenue-driven work, we may provide funding
                for specific public-good projects carried out by for-profit
                companies.
              </Disclaimer>
            </Section>
            <Section>
              <H2>The Process</H2>
              <ProcessContainer>
                <ProcessItem>
                  <ProcessItemChart text="Inquiry form" />
                  <ItemDescription>
                    If you’re interested in requesting ESP support, your first
                    stop is the <Link to="/inquire/">inquiry form</Link>. The
                    inquiry form is the first step in opening a conversation
                    with the ESP team. The more information we have, the better
                    guidance we can provide!
                  </ItemDescription>
                </ProcessItem>
                <ProcessItem>
                  <ProcessItemChart text="Identify support opportunities" />
                  <div>
                    <ItemDescription>
                      Once we've gotten to know you and your project, we'll work
                      to identify ways we might be able to support you in moving
                      your work forward.
                    </ItemDescription>
                    <ItemDescription>
                      If the conversation moves toward financial support, the
                      team will send you a link to begin a formal grant
                      proposal.
                    </ItemDescription>
                  </div>
                </ProcessItem>
                <ProcessItem>
                  <ProcessItemChart text="Formal proposal" />
                  <ItemDescription>
                    The first step in applying for a grant is to fill out a
                    formal proposal.
                  </ItemDescription>
                </ProcessItem>
                <ProcessItem>
                  <ProcessItemChart text="Evaluation" />
                  <ItemDescription>
                    Next, the team provides initial feedback based on the
                    information they’ve collected.
                  </ItemDescription>
                </ProcessItem>
                <ProcessItem>
                  <ProcessItemChart text="Technical interviews" />
                  <div>
                    <ItemDescription>
                      Once the proposal has been finalized, it will go through a
                      technical review.
                    </ItemDescription>
                    <ItemDescription>
                      You will typically be invited to two calls - a meeting
                      with the ESP team member assigned to facilitate the
                      review, and a technical interview with advisors where
                      you'll dive deep into the technical details of your
                      approach in a more structured conversation with advisors
                      selected for their expertise in relevant areas.
                    </ItemDescription>
                  </div>
                </ProcessItem>
                <ProcessItem>
                  <ProcessItemChart text="Funding decision" />
                  <ItemDescription>
                    Once the review process is completed, the ESP team makes a
                    final decision on whether to fund the proposal, and the
                    amount that will be allocated.
                  </ItemDescription>
                </ProcessItem>
                <ProcessItem>
                  <ProcessItemChart text="KYC" shouldDisplayArrow={false} />
                  <ItemDescription>
                    All grantees need to go through KYC (Know Your Customer) in
                    order to receive their funds.
                  </ItemDescription>
                </ProcessItem>
              </ProcessContainer>
            </Section>
          </MainContent>
        </PageBody>
      </div>
    </>
  )
}

export default GuidePage
