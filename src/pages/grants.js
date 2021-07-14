import React from "react"
import styled from "styled-components"

import Link from "../components/Link"
import PageMetadata from "../components/PageMetadata"
import {
  H1,
  H2,
  PageBody,
  PageHeader,
  ButtonLink,
} from "../components/SharedStyledComponents"
import { screenSizeM } from "../utils/styles"

const ButtonContainer = styled.div`
  margin: 60px 0;
  display: flex;
  justify-content: space-around;

  @media (max-width: ${screenSizeM}) {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & > * {
      margin-top: 30px;
    }
  }
`

const GrantsPage = () => {
  return (
    <>
      <PageMetadata
        title="Ethereum Grants"
        description="ESP grants: requirements, guidelines, application process and how to learn more."
      />
      <div>
        <PageHeader>
          <H1>Ethereum Grants</H1>
        </PageHeader>
        <PageBody>
          <H2>About ESP Grants</H2>
          <p>
            Grants are one of the many ways that ESP supports projects in the
            Ethereum ecosystem. When we say "grants,” we're referring to direct
            funding awarded following a formal application, intensive review,
            and a decision made by the ESP team with input from technical
            advisors.
          </p>
          <H2>Requirements and Guidelines</H2>
          <p>
            When it comes to ESP inquiries, we’re happy to hear from any type of
            project to see what kind of support we might be able to provide.
            However, we have some specific criteria for projects that go on to
            apply for traditional grants:
          </p>
          <ul>
            <li>
              Any code resulting from work funded by a grant must be open source
            </li>
            <li>
              Proposed work should have the potential to positively impact
              Ethereum
            </li>
            <li>
              We do not fund for-profit work (but work on public goods by
              for-profit entities is fair game)
            </li>
            <li>
              We will not fund or promote any project with an ongoing or
              upcoming ICO or public funding round
            </li>
          </ul>
          <p>
            Grants tend to focus on public goods, universal tools and common
            infrastructure, but this is a general guideline rather than a hard
            requirement.
          </p>
          <p>
            We're always open to new ideas, exploration and experimentation. If
            you think your project can help Ethereum thrive but aren't sure if
            it fits these guidelines, <Link to="/inquire/">let's talk</Link>!
            Even if grant funding isn't a viable option, we may be able to help
            in some other way. You can read more about our holistic approach to
            supporting the Ethereum ecosystem <Link to="/support/">here</Link>.
          </p>
          <H2>It all starts with an inquiry!</H2>
          <p>
            If you’re interested in applying for a grant, the first step is to
            fill out an <Link to="/inquire/">inquiry</Link>. There is no
            separate process for a grant application; if a grant is what you’re
            after, feel free to let us know in your inquiry! We’ll start by
            getting to know you through the information you provide in the
            inquiry and any follow-up conversations, and go from there.
          </p>
          <p>
            If your inquiry progresses to a formal proposal, we’ll gather
            detailed information on your goals, technical approach, planned
            execution and more. The ESP team will work with you to refine and
            rescope your proposal as needed, then evaluate the final proposal
            with input from technical advisors before a funding decision is
            made.
          </p>
          <H2>Open Call: Road to Devcon Meetup and Event Grants</H2>
          <p>
            The Ethereum Foundation is sponsoring a wave of small grants for
            meetups and events. Applications are open through August 12.
          </p>
          <ButtonContainer>
            <ButtonLink to="/devcon-grants/">See details</ButtonLink>
          </ButtonContainer>
          <H2>More Information</H2>
          <p>
            You can find detailed information on the inquiry and grant
            application processes in the <Link to="/guide/">Guide to ESP</Link>.
          </p>
          <p>
            Our <Link to="/wishlist/">Wishlist</Link> includes some of the areas
            we've been most focused on recently. Keep in mind that the Wishlist
            is not meant to serve as a comprehensive list of ESP's interests or
            a call for specific proposals, but to spark ideas and give context
            for our work.
          </p>
          <p>
            If you'd like to learn more about past grant recipients, check out
            our <Link to="/projects/">featured projects</Link> for a few great
            examples of grant-funded work, or our regular allocation updates for
            a more comprehensive list:
          </p>
          <ul>
            <li>
              <Link to="https://blog.ethereum.org/2020/11/25/esp-q3-updates/">
                2020 Q3
              </Link>
            </li>
            <li>
              <Link to="https://blog.ethereum.org/2020/09/08/esp-q2-updates/">
                2020 Q2
              </Link>
            </li>
            <li>
              <Link to="https://blog.ethereum.org/2020/05/07/ecosystem-support-program-allocation-update-q1/">
                2020 Q1
              </Link>
            </li>
            <li>
              <Link to="https://blog.ethereum.org/2020/04/01/ecosystem-support-program-allocation-update/">
                2019 year in review
              </Link>
            </li>
          </ul>
        </PageBody>
      </div>
    </>
  )
}

export default GrantsPage
