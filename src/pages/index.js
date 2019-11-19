import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import horzLogo from "../images/horz-logo.svg"
import vertLogo from "../images/vert-logo.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div>
      <div
        className="hero"
        style={{
          height: `100vh`, // TODO subtract line & nav heights
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `center`,
        }}
      >
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
        <Link to="/#welcome" className="hero-link">
          <FontAwesomeIcon className="hero-icon" icon={faChevronDown} />
        </Link>
      </div>
      <div id="welcome">
        <h1>Welcome!</h1>
        <p
          style={{
            lineHeight: `1.5em`,
          }}
        >
          The Ethereum Ecosystem Support Program exists to provide both
          financial and non-financial support to projects and entities within
          the greater Ethereum community, in order to accelerate the growth of
          the ecosystem. The Ecosystem Support Program is an expansion of the
          original Ethereum Grants Program which mainly focused on financial
          support. Our focus is on deploying our resources where they will have
          the biggest impact.
        </p>
        <div style={{ marginTop: `30px`, textAlign: `center` }}>
          <Link to="/contact" className="btn">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
