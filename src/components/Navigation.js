import React from "react"
import { motion } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import MenuItem from "./MenuItem"

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

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
`

// TODO how to wrap component w/ motion?
// Requires forwardRef
// https://github.com/framer/motion/issues/194
// const Logo = styled(motion.custom(Img))`
// OR just make Logo slowly appear via CSS transition?
const Logo = styled(Img)`
  margin-bottom: 40px;
`

const navItems = [
  { route: "/", text: "Home" },
  { route: "/faq/", text: "FAQ" },
  { route: "/projects/", text: "Featured projects" },
  { route: "/wishlist/", text: "Wish List" },
]

const Navigation = ({ isOpen, toggle }) => {
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
    <List variants={variants}>
      {isOpen && (
        <Logo
          fixed={data.file.childImageSharp.fixed}
          alt="Ethereum Ecosystem Support Program Logo"
        />
      )}
      {navItems.map((item, idx) => (
        <MenuItem item={item} key={idx} toggle={toggle} />
      ))}
    </List>
  )
}

export default Navigation
