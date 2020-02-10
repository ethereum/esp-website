import React from "react"
import { motion } from "framer-motion"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import { screenSizeS } from "../utils/styles"

const List = styled(motion.ul)`
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  top: 100px;
  width: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* Only display on mobile */
  @media (min-width: ${screenSizeS}) {
    display: none;
  }
`

// TODO how to wrap component w/ motion?
// Requires forwardRef
// https://github.com/framer/motion/issues/194
// const Logo = styled(motion.custom(Img))`
// OR just make Logo slowly appear via CSS transition?
const Logo = styled(Img)`
  margin-bottom: 40px;
`

const Item = styled(motion.li)`
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const navItems = [
  { route: "/", text: "Home" },
  { route: "/faq/", text: "FAQ" },
  { route: "/projects/", text: "Featured projects" },
  { route: "/wishlist/", text: "Wish List" },
]

const MobileNavLinks = ({ toggle }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "favicons/114.png" }) {
        childImageSharp {
          fixed(width: 90) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <List
      initial={{ y: -300 }}
      animate={{
        y: 0,
        transition: { duration: 1 },
      }}
      exit={{
        y: -500,
        transition: {
          duration: 0.7,
        },
      }}
    >
      <Logo
        fixed={data.file.childImageSharp.fixed}
        alt="Ethereum Ecosystem Support Program Logo"
      />
      {navItems.map((item, idx) => (
        <Item item={item} key={idx} onClick={toggle}>
          <h3>
            <Link to={item.route}>{item.text}</Link>
          </h3>
        </Item>
      ))}
    </List>
  )
}

export default MobileNavLinks
