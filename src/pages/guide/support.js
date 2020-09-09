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

const SupportPage = () => {
  return (
    <>
      <PageMetadata title="ESP Support Tips" />
      <div>
        <PageHeader>
          <H1>Guide to ESP</H1>
        </PageHeader>
        <PageBody>
          <GuideNav />
          <MainContent>
            <Breadcrumbs to="/guide/" copy={"Back to About This Guide"} />
            <Section>
              <H2>Identify support opportunities</H2>
              <p>
                Once we've gotten to{" "}
                <Link to="/guide/inquiry/">know you and your project</Link>,
                we'll work to identify ways we might be able to support you in
                moving your work forward.
              </p>
              <p>
                Sometimes it's as simple as a friendly conversation and a nudge
                in the right direction, pointing you to resources, communities
                or events that could be useful to you. Some common support
                opportunities include:
              </p>
              <ul>
                <li>Feedback and direction</li>
                <li>Collaborations with other teams and individuals</li>
                <li>
                  Connections with mentors, advisors or others working in the
                  same topic area
                </li>
                <li>
                  Introductions to community members in the same geographical
                  area
                </li>
                <li>
                  Information about events (hackathons, conferences, etc.) to
                  meet the community, showcase work, and get feedback
                </li>
                <li>
                  Identifying opportunities for grants, bounties, or other
                  funding sources
                </li>
              </ul>
              <p>
                These are examples of the kinds of support we offer - but it's
                very much a personalized process. If what you need isn't on our
                usual menu, we're still happy to talk about it and see if it's a
                capability we can add. Often it makes sense to take a
                multi-pronged approach rather than limiting ourselves to a
                single category of support, such as combining initial technical
                feedback with ongoing mentorship or recommending an event and
                facilitating connections with other attendees.
              </p>
              <p>
                We consider many angles in deciding what support we're able to
                provide. Among other things, we'll take into account your goals,
                your stated needs, the stage of your project and ESP's own goals
                and priorities. There's no guarantee that an inquiry will result
                in any specific type of support, and there are times when a
                project's needs just don't match up with our capabilities, but
                we're always looking for ways to help if we can!
              </p>
            </Section>
          </MainContent>
        </PageBody>
      </div>
    </>
  )
}

export default SupportPage
