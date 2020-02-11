import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import SEO from "../components/seo"
import Event from "../components/event"
import {
  PageBody,
  StyledLink,
  ButtonLink,
  H2,
  HR,
} from "../components/SharedStyledComponents"
import horzLogo from "../images/horz-logo.svg"
import vertLogo from "../images/vert-logo.svg"
import { screenSizeM, screenSizeS } from "../utils/styles"

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

const Section = styled.div`
  margin-bottom: 48px;
`

const EventContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 32px;

  @media (max-width: ${screenSizeM}) {
    flex-direction: column;
  }
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
                  Ethereum Foundation's Ecosystem Support Program exists to
                  provide both financial and non-financial support to projects
                  and entities within the greater Ethereum community, in order
                  to accelerate the growth of the ecosystem. The Ecosystem
                  Support Program is an expansion of the original Ethereum
                  Grants Program which mainly focused on financial support. Our
                  focus is on deploying our resources where they will have the
                  biggest impact.
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
                  Our website has grown! You're already here, so why not look
                  around? Get the latest news, find out which community events
                  we'll be at, learn about some of the{" "}
                  <Link to="/projects/">projects we've supported</Link>, and
                  check out our <Link to="/wishlist/">wishlist</Link> and
                  expanded <Link to="/faq/">FAQ</Link>. Keep an eye out for even
                  more additions in the coming months, and regular updates to
                  the existing content.
                </p>
              </Section>
              <HR />
              <Section>
                <H2>Upcoming Events</H2>
                <p>Find us at these community events!</p>
                <EventContainer>
                  <Event />
                  <Event />
                  <Event />
                </EventContainer>
              </Section>
              <HR />
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
