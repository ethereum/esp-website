import React from "react"
import { useRef } from "react"
import { motion, useCycle } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import MenuToggle from "./MenuToggle"
import Navigation from "./Navigation"
import { StyledLink } from "./SharedStyledComponents"
import * as styles from "../utils/styles"

const StyledNav = styled(motion.nav)`
  position: fixed;
  z-index: 100;
  background: #ffffff;
  width: 100%;
  padding: 15px 60px 5px 15px;
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

const NavLogoText = styled.div`
  margin: 0;
  margin-left: 5px;
  @media (max-width: ${styles.screenSizeM}) {
    display: flex;
    flex-direction: column;
  }
`

// Mobile
const sidebar = {
  open: {
    clipPath: `circle(1000px at 200px 0px)`,
    transition: {
      type: "spring",
      stiffness: 50,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: "circle(24px at 200px 0px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 200,
      damping: 40,
    },
  },
}

const Background = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${props => (props.isOpen ? "100%" : "0")};
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
      initial={false}
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
          Wish List
        </NavLink>
      </NavLinks>
      {/* Mobile */}
      <Background isOpen={isOpen} variants={sidebar} />
      <Navigation isOpen={isOpen} toggle={() => toggleOpen()} />
      <MenuToggle toggle={() => toggleOpen()} />
    </StyledNav>
  )
}

export default Nav
