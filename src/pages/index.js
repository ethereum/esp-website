import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { FormattedMessage, injectIntl } from "gatsby-plugin-intl"
import "@fortawesome/fontawesome-svg-core/styles.css"

import Link from "../components/Link"
import PageMetadata from "../components/PageMetadata"
import NewsletterSignup from "../components/NewsletterSignup"
import {
  PageBody,
  Section,
  ButtonLink,
  H2,
} from "../components/SharedStyledComponents"
import horzLogo from "../images/horz-logo.svg"
import vertLogo from "../images/vert-logo.svg"
import {
  screenSizeM,
  screenSizeS,
  colorGrayLight,
  colorOrangeLightest,
} from "../utils/styles"

const Hero = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -100px;
`

const Copy = styled.div`
  margin-bottom: 56px;
`

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

const HorizontalLogo = styled.img`
  width: 450px;
  margin-left: auto;
  margin-right: auto;
  display: block;

  @media (max-width: ${screenSizeS}) {
    display: none;
  }
`

const VerticalLogo = styled.img`
  display: none;

  @media (max-width: ${screenSizeS}) {
    width: 200px;
    display: block;
    margin: 2rem auto;
  }
  @media (max-width: 340px) {
    width: 140px;
    display: block;
    margin: 2rem auto;
  }
`

const H1 = styled.h1`
  padding-top: 110px;
  font-weight: bold;
`

const Header = styled.h3`
  text-align: center;
  margin-top: 8px;
  color: ${colorGrayLight};

  @media (max-width: 340px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

const DevconCallout = styled.div`
  background-color: ${colorOrangeLightest};
  padding: 24px;
`

const IndexPage = ({ intl }) => {
  const [showHeroLink, setShowHeroLink] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset <= 100 && !showHeroLink) {
        setShowHeroLink(true)
      }
      if (window.pageYOffset > 100 && showHeroLink) {
        setShowHeroLink(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [showHeroLink])

  return (
    <>
      <PageMetadata title={intl.formatMessage({ id: "page-home.title" })} />
      <div>
        <Hero>
          <HorizontalLogo
            src={horzLogo}
            alt="Ecosystem Support Program Horizontal Logo"
          />
          <VerticalLogo
            src={vertLogo}
            alt="Ecosystem Support Program Vertical Logo"
          />
          <Header>
            <FormattedMessage id="page-home.header" />
          </Header>
          <Link
            to="#welcome"
            className={"hero-link " + (showHeroLink ? "show" : "hide")}
          >
            <FontAwesomeIcon className="hero-icon" icon={faChevronDown} />
          </Link>
        </Hero>
        <PageBody>
          <Copy id="welcome">
            <Section>
              <H1>
                <FormattedMessage id="page-home.h1" />
              </H1>
              <p>
                <FormattedMessage id="page-home.p-1" />
              </p>
              <p>
                <FormattedMessage id="page-home.p-2" />
              </p>
            </Section>
            <DevconCallout>
              <FormattedMessage id="page-home.devcon-callout" />{" "}
              <Link to="/devcon-grants/">
                <FormattedMessage id="page-home.see-details" />
              </Link>
            </DevconCallout>
            <H2 id="contact">
              <FormattedMessage id="page-home.contact-us" />
            </H2>
            <p>
              <FormattedMessage id="page-home.contact-us-desc" />
            </p>
            <ButtonContainer>
              <ButtonLink to="/inquire/">
                <FormattedMessage id="page-home.inquire" />
              </ButtonLink>
            </ButtonContainer>
            <Section id="newsletter">
              <H2>
                <FormattedMessage id="page-home.updates" />
              </H2>
              <NewsletterSignup />
            </Section>
          </Copy>
        </PageBody>
      </div>
    </>
  )
}

export default injectIntl(IndexPage)
