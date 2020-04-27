import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

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
        <SEO title="Home" />
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
            <Header>An Ethereum Foundation Initiative</Header>
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
                  Welcome!
                </h1>
                <p>
                  The Ecosystem Support Program exists to provide both financial
                  and non-financial support to projects and entities within the
                  greater Ethereum community, in order to accelerate the growth
                  of the ecosystem. The Ecosystem Support Program is an
                  expansion of the original Ethereum Grants Program which mainly
                  focused on financial support. Our focus is on deploying our
                  resources where they will have the biggest impact.
                </p>
                <p>
                  If you've got a project and want to see if ESP is a good fit,{" "}
                  <Link to="/#contact">get in touch</Link>!
                </p>
              </Section>
              <HR />
              <Section>
                <H2>Recent News</H2>
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
                <p>
                  <strong>March 12, 2020</strong>: For the health and safety of
                  our team, we’ll be suspending attendance at in-person events
                  for the foreseeable future. We extend our deepest sympathy for
                  the tough decisions faced by event organizers, who do such
                  incredible work to bring the community together, in light of
                  the current global situation. Meanwhile, our other operations
                  are continuing as normal: we’re still taking applications,
                  providing support and moving ahead with our other initiatives.
                  We hope everyone in the community will stay safe, healthy and
                  support each other through this difficult time. No matter who
                  and where you are, we’re all in this together!
                </p>
              </Section>
              <Section>
                <TwitterFeed />
              </Section>
              <Section id="newsletter">
                <H2>Sign up for updates</H2>
                <NewsletterSignup />
              </Section>
              <HR />
              <UpcomingEvents />
              <H2 id="contact">Contact Us</H2>
              <p>
                Are you working on a specific project, or are you still
                exploring possibilities to get involved?
              </p>
              <ButtonContainer>
                <ButtonLink to="/project/">Specific project</ButtonLink>
                <ButtonLink to="/explore/">Exploring possibilities</ButtonLink>
              </ButtonContainer>
            </Copy>
          </PageBody>
        </div>
      </>
    )
  }
}

export default IndexPage
