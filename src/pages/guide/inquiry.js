import React from "react"
import styled from "styled-components"

import Breadcrumbs from "../../components/Breadcrumbs"
import PageMetadata from "../../components/PageMetadata"
import {
  ButtonLink,
  H1,
  H2,
  PageBody,
  PageHeader,
  Section,
} from "../../components/SharedStyledComponents"

const ButtonContainer = styled.div`
  margin: 60px 0;
  display: flex;
  justify-content: center;
`

const InquiryPage = () => {
  return (
    <>
      <PageMetadata title="ESP Inquiry Form Tips" />
      <div>
        <PageHeader>
          <H1>Guide to ESP</H1>
        </PageHeader>
        <PageBody>
          <Breadcrumbs to="/guide/" copy={"Back to About This Guide"} />
          <Section>
            <H2>ESP Inquiry Form Tips</H2>
            <p>A comprehensive guide to the ESP inquiry form.</p>
            <p>
              First and foremost, don't be intimidated by this form or lose
              sleep over it - it really is just the start of a conversation.
              It's good to be clear, specific and thoughtful, but don't worry
              about perfection. Reading every word of this page is not a
              necessity; we just want to make sure you can get clarity about any
              of the questions if you're unsure what we're asking for!
            </p>
            <p>
              To start, we'll ask whether you're working on a specific project
              or still exploring, and you'll get a slightly different set of
              questions depending on which path you choose.{" "}
            </p>
            <p>
              Select "specific project" if you have a defined idea, regardless
              of the stage of development. Whether you've been working a project
              for a while already, are in early stages but have a general idea
              of your goals and path forward, or haven't started work but know
              what you want to do, this is the place for you.
            </p>
            <p>
              Select "exploring possibilities" if you want to engage with
              Ethereum but you're still figuring out how - for example, if you
              have a skill set you'd like to put to work but aren't sure where
              it's most needed, or you're exploring integrating Ethereum into an
              existing business and could use help navigating the ecosystem.
            </p>
            <p>
              After your inquiry is submitted, we'll get in touch within 1-2
              business days to get the conversation started. From there we'll
              answer any questions you might have and ask you for more info if
              needed.
            </p>
            <ButtonContainer>
              <ButtonLink to="/inquire/">Submit an inquiry</ButtonLink>
            </ButtonContainer>
          </Section>
        </PageBody>
      </div>
    </>
  )
}

export default InquiryPage
