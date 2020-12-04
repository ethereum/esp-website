import React from "react"
import styled from "styled-components"

import Link from "../components/Link"
import PageMetadata from "../components/PageMetadata"
import {
  ButtonExternalLink,
  H1,
  H2,
  PageBody,
  PageHeader,
} from "../components/SharedStyledComponents"

const StyledButtonLink = styled(ButtonExternalLink)`
  margin: 2rem 0;
`

const SupportPage = () => {
  return (
    <>
      <PageMetadata
        title="ESP Support"
        description="The many ways ESP can support Ethereum's builders, and how to request help for your project."
      />
      <div>
        <PageHeader>
          <H1>Support</H1>
        </PageHeader>
        <PageBody>
          <H2>About ESP support</H2>
          <p>
            The “support” in Ecosystem Support Program can mean many different
            things, from project validation and encouragement to more tangible
            resources such as platform credits or financial grants.
          </p>
          <p>
            Grants are narrowly defined, with some specific qualifying criteria
            and standardized processes for any inquiry that moves into a formal
            grant proposal. You can read more about our grants program{" "}
            <Link to="/grants/">here</Link>.
          </p>

          <p>
            The other work we do is less clear-cut. The Ethereum Foundation has
            many valuable resources: visibility; access to a massive collective
            knowledge base; a creative and dedicated team; connections to
            leading developers, researchers and community members. Our goal is
            to deploy these resources as impactfully as we can.
          </p>
          <H2>Types of support</H2>
          <p>
            Some of the most common forms of support we've provided in the past
            include:
          </p>
          <ul>
            <li>Feedback and guidance</li>
            <li>
              Facilitating collaborations with other teams and individuals
            </li>
            <li>
              Connections with mentors, advisors or others working in the same
              topic area
            </li>
            <li>
              Information about events (hackathons, conferences, etc.) to meet
              the community, showcase work, and get feedback
            </li>
            <li>
              Introductions to community members in the same geographical area
            </li>
            <li>Platform credits</li>
            <li>Event sponsorships</li>
            <li>
              Identifying opportunities for grants, bounties, incubators or
              other funding sources
            </li>
          </ul>
          <p>
            This is not an exhaustive list! We are always open to new ideas, and
            happy to explore possibilities outside our usual “menu” as our
            capabilities allow.
          </p>
          <p>
            For some examples of projects that have received support other than
            traditional financial grants, check out our blog post,{" "}
            <Link to="https://blog.ethereum.org/2020/08/19/esp-beyond-grants/">
              ESP: Beyond Grants
            </Link>
            .
          </p>
          <H2>It all starts with an inquiry!</H2>
          <p>
            If you’re interested in requesting support from ESP, the first step
            is to fill out an <Link to="/inquire/">inquiry</Link>. The inquiry
            process is designed to be flexible and find the best solution for
            each project we hear from; think of this form as the start of a
            conversation, not a formal application. If you're still feeling
            uncertain, just select "General Inquiry" and we'll be happy to
            answer any questions you might have.
          </p>
          <p>
            You can find detailed information on the inquiry process in our{" "}
            <Link to="/guide/">Guide to ESP</Link>.
          </p>
        </PageBody>
      </div>
    </>
  )
}

export default SupportPage
