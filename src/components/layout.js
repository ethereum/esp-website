import React from "react"
import PropTypes from "prop-types"

import Footer from "./footer"
import Nav from "./nav"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <div className="line top"></div>
      <div className="line left"></div>
      <div className="line right"></div>
      <div className="layout">
        <Nav />
        <div
          style={{
            margin: `0 auto 1rem`,
            maxWidth: `780px`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
        </div>
        <Footer />
        <div className="line bottom"></div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
