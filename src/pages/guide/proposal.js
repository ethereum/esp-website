import React from "react"
import styled from "styled-components"

import Breadcrumbs from "../../components/Breadcrumbs"
import GuideNav from "../../components/GuideNav"
import PageMetadata from "../../components/PageMetadata"
import {
  H1,
  H2,
  PageBodyWide,
  PageHeader,
  Section,
} from "../../components/SharedStyledComponents"

const PageBody = styled(PageBodyWide)`
  display: flex;
`
const MainContent = styled.div``

const ProposalPage = () => {
  return (
    <>
      <PageMetadata title="ESP Formal Grant Proposal Tips" />
      <div>
        <PageHeader>
          <H1>Guide to ESP</H1>
        </PageHeader>
        <PageBody>
          <GuideNav />
          <MainContent>
            <Breadcrumbs to="/guide/#process" copy={"Back to Overview"} />
            <Section>
              <H2>ESP Formal Grant Proposal</H2>
              <p>
                The first step in applying for a grant is to fill out a formal
                proposal.
              </p>
              <h3>Team structure and qualifications</h3>
              <p>
                In addition to some basic information about your organization
                and team, we want to understand why this is the right team to
                take on this particular project - how does the team's expertise
                match the project's main challenges, and how does the main team
                members' past work prepare them to meet the project's
                objectives.
              </p>
              <h3>Project details</h3>
              <p>
                You'll be asked about details about your technical approach,
                roadmap and rationale. Some of the areas you'll address will
                include:
              </p>
              <ul>
                <li>Main concept: what will you do or produce?</li>
                <li>
                  Current status: is this an idea, proof of concept, MVP, or
                  established project?
                </li>
                <li>
                  Roadmap: beginning point, end point, milestones and
                  anticipated challenges
                </li>
                <li>Why this project is important to Ethereum?</li>
                <li>
                  How does the project add to work already being done in the
                  same area - not only how it's different from current efforts,
                  but why that difference matters?
                </li>
              </ul>
              <p>
                When describing your project, it's easy to over-focus on the
                product you're building. Of course we want to know what you're
                building, but we also want to know what problem you're solving,
                why it's the right problem to solve, and how existing work fails
                to solve it satisfactorily.
              </p>
              <h3>Impact</h3>
              <p>
                Here you'll tell us what you expect will be the impact of the
                final outcome - how will the Ethereum ecosystem be strengthened
                or advanced? What will be possible that wasn't possible before?
                How many people will benefit? Also consider intermediate impacts
                (e.g. a research paper that will be useful to other teams) and
                indirect impacts (e.g. sparking important discussions or
                building relationships with other communities).
              </p>
              <h3>Sustainability and use of resources</h3>
              <p>
                Finally, we'll ask for a breakdown of how you intend to spend
                any allocated funds or other requested resources, as well as
                your plans for sustaining the project after the end of the
                grant. We'll also ask whether you've secured or applied for any
                other sources of funding - there is no wrong answer here! Having
                multiple sources of funding can reflect well on a team's
                long-term vision for sustainability, and it certainly doesn't
                rule out an additional contribution from ESP.{" "}
              </p>
            </Section>
          </MainContent>
        </PageBody>
      </div>
    </>
  )
}

export default ProposalPage
