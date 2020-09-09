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

const EvaluationPage = () => {
  return (
    <>
      <PageMetadata title="ESP Grant Evaluation Tips" />
      <div>
        <PageHeader>
          <H1>Guide to ESP</H1>
        </PageHeader>
        <PageBody>
          <GuideNav />
          <MainContent>
            <Breadcrumbs to="/guide/" copy={"Back to About This Guide"} />
            <Section>
              <H2>ESP Grant Evaluation Tips</H2>
              <p>More about how we evaluate grant proposals.</p>
              <p>
                Building on the information provided in the{" "}
                <Link to="/guide/proposal/">initial proposal</Link>, the ESP
                team will look deeper into some key areas to unpack, clarify or
                revisit, such as:
              </p>
              <h3>Team</h3>
              <ul>
                <li>How technically competent is the team?</li>
                <li>Is the team value aligned?</li>
                <li>Is this the best team to execute this idea?</li>
              </ul>
              <h3>Concept</h3>
              <ul>
                <li>Is the concept plausible and technically sound?</li>
                <li>Is it sufficiently ambitious?</li>
                <li>Does it advance the state of the art?</li>
                <li>Is it sufficiently differentiated from other efforts?</li>
                <li>Is it aligned with other efforts?</li>
              </ul>
              <h3>Execution & Implementation</h3>
              <ul>
                <li>Does the roadmap make logical sense?</li>
                <li>
                  What are the key challenges or "sub-projects" within the
                  roadmap?
                </li>
                <li>
                  Which aspects of the roadmap are crucial and which are
                  "nice-to-have"?
                </li>
              </ul>
              <h3>Impact</h3>
              <ul>
                <li>
                  Does the project address something important to Ethereum that
                  is not already adequately addressed?
                </li>
                <li>Is the approach clear, and does it make sense?</li>
                <li>
                  Is there a clear reason why specific features and functions
                  have been proposed?
                </li>
              </ul>
              <h3>Risks</h3>
              <ul>
                <li>What are the likely downsides?</li>
                <li>What are the potential unintended consequences?</li>
              </ul>
              <p>
                During this part of the process, the ESP team is in close
                contact to discuss initial feedback and concerns. We'll also
                think about ways to rescope, breaking up the roadmap to examine
                which parts are most compelling, which have tangible value in
                and of themselves, and which would test the project's core
                assumptions most efficiently. This is an opportunity for you to
                think more deeply about the project and roadmap, and we'll work
                with you to revise the initial proposal before submitting a
                final version.
              </p>
            </Section>
          </MainContent>
        </PageBody>
      </div>
    </>
  )
}

export default EvaluationPage
