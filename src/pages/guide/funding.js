import React from "react"
import styled from "styled-components"

import Breadcrumbs from "../../components/Breadcrumbs"
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

const PageBody = styled(PageBodyWide)`
  display: flex;
`
const MainContent = styled.div``

const FundingPage = () => {
  return (
    <>
      <PageMetadata title="ESP Funding Decision Details" />
      <div>
        <PageHeader>
          <H1>Guide to ESP</H1>
        </PageHeader>
        <PageBody>
          <GuideNav />
          <MainContent>
            <Breadcrumbs to="/guide/#process" copy={"Back to Overview"} />
            <Section>
              <H2>ESP Funding Decision Details</H2>
              <p>
                Once the review process is completed, the ESP team makes a final
                decision on whether to fund the proposal, and the amount that
                will be allocated.
              </p>
              <p>
                Having collaborated with the applicant on refining{" "}
                <Link to="/guide/proposal/">the proposal</Link>, gathered
                feedback from technical advisors and{" "}
                <Link to="/guide/evaluation/">
                  evaluated the final proposal
                </Link>
                , the ESP team now looks at all of the information and analysis
                gathered throughout the review process in order to make a
                funding decision.
              </p>
              <p>At this point some practical aspects are also defined:</p>
              <ul>
                <li>Funding amount</li>
                <li>
                  Funding structure (will funding be delivered as a lump sum, in
                  tranches, based on milestones or deliverables?)
                </li>
                <li>Progress evaluation criteria (how is success defined?)</li>
                <li>
                  Milestones and deliverables (what is the team expected to
                  accomplish, and on what timeline?)
                </li>
                <li>Expectations for how funding will be used </li>
              </ul>
              <p>
                When weighing possible funding options the team will consider
                factors like impact on higher-level goals, alternative ways that
                these goals could be addressed, how funding this project might
                either encourage or discourage others working toward similar
                goals, and whether the EF is best suited to support the project
                versus another funding source, in order to find a level of
                support that furthers our mission of moving Ethereum forward
                while using resources as effectively as we can.
              </p>
            </Section>
          </MainContent>
        </PageBody>
      </div>
    </>
  )
}

export default FundingPage
