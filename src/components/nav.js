import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { StyledLink } from "./SharedStyledComponents"
import * as styles from "../utils/styles"

const StyledNav = styled.nav`
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
    display: none;
  }
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
  return (
    <StyledNav className={hasShadow ? "nav-shadow" : ""}>
      <div>
        <NavLinkMain to="/">
          <Img
            fixed={data.file.childImageSharp.fixed}
            alt="Ethereum Ecosystem Support Program Logo"
          />
          <NavLogoText>Ecosystem Support</NavLogoText>
        </NavLinkMain>
      </div>
      <div className="nav-links">
        <NavLink to="/" activeStyle={{ color: styles.colorOrange }}>
          Home
        </NavLink>
        <NavLink to="/faq/" activeStyle={{ color: styles.colorOrange }}>
          FAQ
        </NavLink>
      </div>
    </StyledNav>
  )
}

export default Nav
