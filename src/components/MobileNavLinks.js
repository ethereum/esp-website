import React from "react"
import { motion } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import { FormattedMessage } from "gatsby-plugin-intl"
import styled from "styled-components"
import Img from "gatsby-image"

import { screenSizeM } from "../utils/styles"
import Link from "./Link"

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
  @media (min-width: ${screenSizeM}) {
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

const MobileNavLinks = ({ navItems, toggle }) => {
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

  // TODO add height to background list for larger screens
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
            <Link to={item.to}>
              <FormattedMessage id={item.text} />
            </Link>
          </h3>
        </Item>
      ))}
    </List>
  )
}

export default MobileNavLinks
