import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

import Link from "./Link"
import {
  colorGray,
  colorGrayLighter,
  colorYellow,
  screenSizeL,
} from "../utils/styles"

const Aside = styled.aside`
  position: sticky;
  top: 6.25rem; /* account for navbar */
  margin-top: 1rem;
  padding-top: 1rem;
  margin-right: 3rem;
  min-width: 260px;
  max-width: 25%;
  height: calc(100vh - 380px); /* account for footer */
  min-height: 330px;
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
  transition: transform 0.2s ease;

  @media (max-width: ${screenSizeL}) {
    display: none;
  }
`

const Section = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${colorGrayLighter};
`

const TopSection = styled(Section)`
  border-top: 1px solid ${colorGrayLighter};
  font-weight: bold;
`

const Arrow = styled.span`
  margin-right: 16px;
  color: ${colorYellow};
`

const ProcessDetails = styled.div`
  color: ${colorGray};
  margin-bottom: 0.5rem;
`

const StyledLink = styled(Link)`
  color: black;
`

const NavLink = ({ to, text }) => {
  return (
    <div>
      <Arrow>
        <FontAwesomeIcon icon={faChevronRight} />
      </Arrow>
      <StyledLink to={to}>{text}</StyledLink>
    </div>
  )
}

const GuideNav = () => {
  return (
    <Aside>
      <TopSection>
        <NavLink to="/guide/" text="About This Guide" />
      </TopSection>
      <Section>
        <ProcessDetails>Process Details</ProcessDetails>
        <NavLink to="/guide/inquiry/" text="Inquiry" />
        <NavLink to="/guide/support/" text="Support Opportunities" />
        <NavLink to="/guide/proposal/" text="Formal Proposal" />
        <NavLink to="/guide/evaluation/" text="Evaluation" />
        <NavLink to="/guide/funding/" text="Funding Decision" />
        <NavLink to="/guide/kyc/" text="KYC" />
      </Section>
      <Section>
        <NavLink to="/faq/" text="FAQ" />
      </Section>
    </Aside>
  )
}

export default GuideNav
