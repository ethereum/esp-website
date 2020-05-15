import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { FormattedMessage, injectIntl } from "gatsby-plugin-intl"

import SEO from "../components/seo"
import UpcomingEvents from "../components/UpcomingEvents"
import NewsletterSignup from "../components/NewsletterSignup"
import TwitterFeed from "../components/TwitterFeed"
import {
  PageBody,
  Section,
  StyledLink,
  ButtonLink,
  H2,
  HR,
} from "../components/SharedStyledComponents"
import horzLogo from "../images/horz-logo.svg"
import vertLogo from "../images/vert-logo.svg"
import { screenSizeM, screenSizeS, colorGrayLight } from "../utils/styles"

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
    width: 210px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`

const Header = styled.h3`
  text-align: center;
  margin-top: 8px;
  color: ${colorGrayLight};
`

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showHeroLink: true,
    }
  }

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = () => {
    if (window.pageYOffset <= 100 && !this.state.showHeroLink) {
      this.setState({ showHeroLink: true })
    }
    if (window.pageYOffset > 100 && this.state.showHeroLink) {
      this.setState({ showHeroLink: false })
    }
  }

  render() {
    return (
      <>
        <SEO title={this.props.intl.formatMessage({ id: "page-home.title" })} />
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
            <StyledLink
              to="/#welcome"
              className={
                "hero-link " + (this.state.showHeroLink ? "show" : "hide")
              }
            >
              <FontAwesomeIcon className="hero-icon" icon={faChevronDown} />
            </StyledLink>
          </Hero>
          <PageBody>
            <Copy id="welcome">
              <Section>
                <h1 style={{ paddingTop: `110px`, fontWeight: `bold` }}>
                  <FormattedMessage id="page-home.h1" />
                </h1>
                <p>
                  <FormattedMessage id="page-home.p-1" />
                </p>
                <p>
                  <FormattedMessage id="page-home.p-2" />,{" "}
                  <Link to="/#contact">
                    <FormattedMessage id="page-home.p-2-link" />
                  </Link>
                  !
                </p>
              </Section>
              <HR />
              <Section>
                <H2>
                  <FormattedMessage id="page-home.recent-news" />
                </H2>
                {/* We chose not to translate this for now, given how frequently we update */}
                <p>
                  <strong>May 12, 2020</strong>: Going forward we'll be
                  releasing quarterly updates on financial support allocations.
                  You can{" "}
                  <a
                    href="https://blog.ethereum.org/2020/05/07/ecosystem-support-program-allocation-update-q1/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    find our Q1 2020 update here
                  </a>
                  .
                </p>
                <p>
                  <strong>April 7, 2020</strong>: Check out our recent{" "}
                  <a
                    href="https://blog.ethereum.org/2020/04/01/ecosystem-support-program-allocation-update/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Allocation Update
                  </a>{" "}
                  for details on how we’ve spent our last few months and what we
                  funded in 2019!
                </p>
              </Section>
              <Section>
                <TwitterFeed />
              </Section>
              <Section id="newsletter">
                <H2>
                  <FormattedMessage id="page-home.updates" />
                </H2>
                <NewsletterSignup />
              </Section>
              <HR />
              <UpcomingEvents />
              <H2 id="contact">
                <FormattedMessage id="page-home.contact-us" />
              </H2>
              <p>
                <FormattedMessage id="page-home.contact-us-desc" />
              </p>
              <ButtonContainer>
                <ButtonLink to="/project/">
                  <FormattedMessage id="page-home.specific-project" />
                </ButtonLink>
                <ButtonLink to="/explore/">
                  <FormattedMessage id="page-home.exploring-possibilities" />
                </ButtonLink>
              </ButtonContainer>
            </Copy>
          </PageBody>
        </div>
      </>
    )
  }
}

export default injectIntl(IndexPage)
