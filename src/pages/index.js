import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import SEO from "../components/seo"
import {
  PageBody,
  StyledLink,
  ButtonLink,
} from "../components/SharedStyledComponents"
import horzLogo from "../images/horz-logo.svg"
import vertLogo from "../images/vert-logo.svg"
import { screenSizeM } from "../utils/styles"

const Hero = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Copy = styled.div`
  padding: 16px;
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
            <div className="image">
              <img
                className="horz-logo"
                src={horzLogo}
                alt="Ecosystem Support Program Horizontal Logo"
              />
              <img
                className="vert-logo"
                src={vertLogo}
                alt="Ecosystem Support Program Vertical Logo"
              />
            </div>
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
              <h1 style={{ paddingTop: `110px` }}>Welcome!</h1>
              <p
                style={{
                  lineHeight: `1.5em`,
                }}
              >
                The Ethereum Ecosystem Support Program exists to provide both
                financial and non-financial support to projects and entities
                within the greater Ethereum community, in order to accelerate
                the growth of the ecosystem. The Ecosystem Support Program is an
                expansion of the original Ethereum Grants Program which mainly
                focused on financial support. Our focus is on deploying our
                resources where they will have the biggest impact.
              </p>
              <h2 style={{ paddingTop: `20px` }}>Contact Us</h2>
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
