import React from "react"
import PropTypes from "prop-types"
import { motion, AnimatePresence } from 'framer-motion'

import Footer from "./footer"
import Nav from "./nav"
import "./layout.css"

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
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
}

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
          <div
            style={{
              margin: `0 auto 1rem`,
              maxWidth: `780px`,
              paddingTop: 0,
            }}
          >
          <AnimatePresence>
            <motion.main
              key={window.location.pathname}
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
            {this.props.children}
            </motion.main>
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
