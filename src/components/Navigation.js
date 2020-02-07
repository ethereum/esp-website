import React from "react"
import { motion } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import { MenuItem } from "./MenuItem"

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const List = styled(motion.ul)`
  z-index: 30;
  margin: 0;
  padding: 0;

  padding: 80px;
  position: absolute;
  top: 100px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled(Img)`
  margin-bottom: 40px;
`

export const Navigation = ({ isOpen, toggle }) => {
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

const navItems = [
  { route: "/", text: "Home" },
  { route: "/faq/", text: "FAQ" },
  { route: "/projects/", text: "Featured projects" },
  { route: "/wishlist/", text: "Wish List" },
]