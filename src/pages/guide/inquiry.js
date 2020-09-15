import React from "react"
import styled from "styled-components"

import Breadcrumbs from "../../components/Breadcrumbs"
import GuideNav from "../../components/GuideNav"
import PageMetadata from "../../components/PageMetadata"
import {
  ButtonLink,
  H1,
  H2,
  PageBodyWide,
  PageHeader,
  Section,
} from "../../components/SharedStyledComponents"

const ButtonContainer = styled.div`
  margin: 60px 0;
  display: flex;
  justify-content: center;
`

const PageBody = styled(PageBodyWide)`
  display: flex;
`
const MainContent = styled.div``

const InquiryPage = () => {
  return (
    <>
      <PageMetadata title="ESP Inquiry Form Tips" />
      <div>
        <PageHeader>
          <H1>Guide to ESP</H1>
        </PageHeader>
        <PageBody>
          <GuideNav />
          <MainContent>
            <Breadcrumbs to="/guide/#process" copy={"Back to Overview"} />
            <Section>
              <H2>ESP Inquiry Details</H2>
              <p>
                First and foremost, don't be intimidated by this form or lose
                sleep over it - it really is just the start of a conversation.
                It's good to be clear, specific and thoughtful, but don't worry
                about perfection. Reading every word of this page is not a
                necessity; we just want to make sure you can get clarity about
                any of the questions if you're unsure what we're asking for!
              </p>
              <p>
                After your inquiry is submitted, we'll get in touch within 1-2
                business days to get the conversation started. From there we'll
                answer any questions you might have and ask you for more info if
                needed.
              </p>
              <h3>Project name</h3>
              <p>
                If you're inquiring as an individual, you can just give your own
                name (this doesn't need to be a legal name at this point - we
                just want to know what name you'd like us to use when we get in
                touch).
              </p>
              <h3>Team profile</h3>
              <p>
                If you're part of a team, include any members of your team that
                are working on the project you're inquiring about. This is
                open-ended and you can share anything you think is relevant, but
                useful aspects to address could include:
              </p>
              <ul>
                <li>
                  Information about yourself: skills, background, online bio if
                  available
                </li>
                <li>
                  Time commitments/constraints, and whether you are looking to
                  work on your proposed project full-time or as a side project
                </li>
                <li>Any other details that you'd like us to be aware of</li>
              </ul>
              <h3>Project description</h3>
              <p>
                Tell us as much about your project as you can! Consider
                including details such as:
              </p>
              <ul>
                <li>
                  Stage of your project (just an idea, already in progress,
                  proof of concept or prototype)
                </li>
                <li>Main goals and planned approach</li>
                <li>
                  Online resources (website, research papers, articles, blog
                  posts, GitHub, etc)
                </li>
                <li>Anything else you think we should know!</li>
              </ul>
              <h3>Impact</h3>
              <p>
                As an organization we focus on doing what's best for Ethereum,
                so we want to know how your work will benefit the Ethereum
                ecosystem.{" "}
              </p>
              <ul>
                <li>What problem are you solving?</li>
                <li>What does success look like for your project?</li>
                <li>
                  If there are existing projects working toward similar goals,
                  how does your work add to what's already being done?
                </li>
                <li>
                  Who will benefit, and how: what tools or opportunities will
                  people have that they didn't have before? What will be
                  possible that wasn't possible before?{" "}
                </li>
              </ul>
              <h3>
                What are the most significant obstacles facing your project or
                your team right now?
              </h3>
              <p>
                What is preventing you from accomplishing your goals? This could
                include things like:
              </p>
              <ul>
                <li>Technical dilemmas that you're struggling to overcome</li>
                <li>
                  Difficulty finding support or community in your geographical
                  area
                </li>
                <li>
                  Uncertainty about how to move forward (or where to begin)
                </li>
              </ul>
              <h3>What are some of your most pressing needs?</h3>
              <p>
                What would be most helpful to you in the immediate future? If
                your most pressing need is funding, it's helpful for us to know
                that - but try to think more holistically as well. Needs vary
                widely between projects, but some general categories could
                include:{" "}
              </p>
              <ul>
                <li>Feedback and direction</li>
                <li>
                  Collaborations or connections with other teams, mentors or
                  advisors
                </li>
                <li>
                  Information about events or other opportunities to meet the
                  community, showcase work, and get feedback
                </li>
              </ul>
              <p>
                If funding is your primary concern, you can also include the
                amount you're looking for and how you intend to use it.
              </p>
              <h3>Previous work</h3>
              <p>
                Here, we're looking for more specifics on what you've
                accomplished and what you're currently working on. Don't worry
                if you have an nontraditional resume - there are plenty of ways
                to show your work! Are you a frequent commenter on r/ethereum?
                Have you posted work to ethresear.ch? Do you contribute to any
                GitHub repos? Show us your contributions, whatever form they
                might take.
              </p>

              <ButtonContainer>
                <ButtonLink to="/inquire/">Submit an inquiry</ButtonLink>
              </ButtonContainer>
            </Section>
          </MainContent>
        </PageBody>
      </div>
    </>
  )
}

export default InquiryPage
