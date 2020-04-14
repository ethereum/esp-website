import React from "react"
import { useRef } from "react"
import { motion, useCycle, AnimatePresence } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import MobileNavMenu from "./MobileNavMenu"
import MobileNavLinks from "./MobileNavLinks"
import { StyledLink } from "./SharedStyledComponents"
import * as styles from "../utils/styles"

const StyledNav = styled(motion.nav)`
  position: fixed;
  z-index: 100;
  background: #ffffff;
  width: 100%;
  padding: 15px 50px 5px 15px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavLinkMain = styled(StyledLink)`
  display: flex;
  align-items: center;
  color: black;
  margin-right: 20px;
  padding: 0 0 10px 0;
`

const NavLinks = styled.div`
  /* Hide & display MenuToggle */
  @media (max-width: ${styles.screenSizeS}) {
    display: none;
  }
`

const NavLink = styled(StyledLink)`
  color: black;
  font-size: 18px;
  margin-right: 20px;
  padding: 0 0 10px 0;
  display: inline-block;
  position: relative;

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: ${styles.colorOrange};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover:after {
    width: 100%;
    left: 0;
  }
`

const NavLinkExternal = styled.a`
  color: black;
  font-size: 18px;
  margin-right: 20px;
  padding: 0 0 10px 0;
  display: inline-block;
  position: relative;

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: ${styles.colorOrange};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover:after {
    width: 100%;
    left: 0;
  }
`

const NavLogoText = styled.div`
  margin: 0;
  margin-left: 5px;
  @media (max-width: ${styles.screenSizeM}) {
    display: flex;
    flex-direction: column;
  }
`

// Mobile
const backgroundVariants = {
  open: {
    clipPath: `circle(1000px at 200px 0px)`,
    transition: {
      type: "spring",
      stiffness: 50,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: "circle(24px at 200px -10px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 200,
      damping: 40,
    },
  },
}

const MobileNavBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${styles.colorGrayLightest};
`

const Nav = ({ hasShadow }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "favicons/114.png" }) {
        childImageSharp {
          fixed(width: 45) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null) // TODO is this needed?

  return (
    <StyledNav
      className={hasShadow ? "nav-shadow" : ""}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
    >
      <div>
        <NavLinkMain to="/">
          <Img
            fixed={data.file.childImageSharp.fixed}
            alt="Ethereum Ecosystem Support Program Logo"
          />
          <NavLogoText>
            <span>Ecosystem</span> <span>Support</span>
          </NavLogoText>
        </NavLinkMain>
      </div>
      {/* Desktop */}
      <NavLinks>
        <NavLink to="/faq/" activeStyle={{ color: styles.colorOrange }}>
          FAQ
        </NavLink>
        <NavLink to="/projects/" activeStyle={{ color: styles.colorOrange }}>
          Featured Projects
        </NavLink>
        <NavLink to="/wishlist/" activeStyle={{ color: styles.colorOrange }}>
          Wishlist
        </NavLink>
        <NavLinkExternal
          href="https://blog.ethereum.org/category/esp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog
        </NavLinkExternal>
      </NavLinks>
      {/* Mobile */}
      <MobileNavBackground variants={backgroundVariants} />
      <AnimatePresence>
        {isOpen && (
          <MobileNavLinks key="navigation" toggle={() => toggleOpen()} />
        )}
      </AnimatePresence>
      <MobileNavMenu toggle={() => toggleOpen()} />
    </StyledNav>
  )
}

export default Nav
