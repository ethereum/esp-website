import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"
import { ToastProvider } from "react-toast-notifications"
import { IntlProvider, IntlContextProvider } from "gatsby-plugin-intl"

import Footer from "./Footer"
import Nav from "./Nav"
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

const Layout = ({ pageContext, children }) => {
  const [hasNavShadow, setHasNavShadow] = useState(false)
  const { intl } = pageContext

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset <= 20 && hasNavShadow) {
        setHasNavShadow(false)
      }
      if (window.pageYOffset > 20 && !hasNavShadow) {
        setHasNavShadow(true)
      }
    }
    window.addEventListener("scroll", handleScroll)

    // add smooth scroll behavior for anchor links
    // https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
    if (typeof window !== "undefined") {
      // eslint-disable-next-line global-require
      require("smooth-scroll")('a[href*="#"]')
    }
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasNavShadow])

  return (
    <IntlProvider
      locale={intl.language}
      defaultLocale={intl.defaultLocale}
      messages={intl.messages}
    >
      <IntlContextProvider value={intl}>
        <ToastProvider>
          <div className="line top"></div>
          <div className="line left"></div>
          <div className="line right"></div>
          <div className="layout">
            <Nav hasShadow={hasNavShadow} />
            <div>
              <AnimatePresence>
                <Main
                  variants={variants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  {children}
                </Main>
              </AnimatePresence>
            </div>
            <Footer />
            <div className="line bottom"></div>
          </div>
        </ToastProvider>
      </IntlContextProvider>
    </IntlProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
