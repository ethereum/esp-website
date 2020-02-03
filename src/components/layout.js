import React from "react"
import PropTypes from "prop-types"
import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"

import Footer from "./footer"
import Nav from "./nav"
import "./layout.css"
import * as styles from "../utils/styles"

const duration = 0.5

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
}

const Main = styled(motion.main)`
  padding-top: 75px;
  /* lines (25px * 2) + footer (87.5px) = 137.6px */
  min-height: calc(100vh - 137.5px);
  @media (max-width: ${styles.screenSizeS}) {
    /* lines (18px * 2) + footer (53px) = 89px */
    min-height: calc(100vh - 89px);
  }
`

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasNavShadow: false,
    }
  }

  // TODO all this `hasNavShadow` logic should be in <Nav />
  // I couldn't figure out how to make <Nav /> a class component
  // & still use staticQuery for the image loading
  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll)

    // add smooth scroll behavior for anchor links
    // https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
    if (typeof window !== "undefined") {
      // eslint-disable-next-line global-require
      require("smooth-scroll")('a[href*="#"]')
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = () => {
    if (window.pageYOffset <= 20 && this.state.hasNavShadow) {
      this.setState({ hasNavShadow: false })
    }
    if (window.pageYOffset > 20 && !this.state.hasNavShadow) {
      this.setState({ hasNavShadow: true })
    }
  }

  render() {
    return (
      <>
        <div className="line top"></div>
        <div className="line left"></div>
        <div className="line right"></div>
        <div className="layout">
          <Nav hasShadow={this.state.hasNavShadow} />
          <div>
            <AnimatePresence>
              <Main
                key={this.props.location.pathname}
                variants={variants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                {this.props.children}
              </Main>
            </AnimatePresence>
          </div>
          <Footer />
          <div className="line bottom"></div>
        </div>
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
