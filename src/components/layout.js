import React from "react"
import PropTypes from "prop-types"

import Footer from "./footer"
import Nav from "./nav"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <div className="line top"></div>
      <div className="line bottom"></div>
      <div className="line left"></div>
      <div className="line right"></div>
      {/* TODO change margin based on screen size */}
      <div
        style={{
          margin: `25px`,
        }}
      >
        <Nav />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: `780px`,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
