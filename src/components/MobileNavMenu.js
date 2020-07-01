import React from "react"
import { motion } from "framer-motion"
import styled from "styled-components"

import { screenSizeM } from "../utils/styles"

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#F26B38"
    strokeLinecap="round"
    {...props}
  />
)

const Button = styled.button`
  outline: none;
  border: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
  background: transparent;
  z-index: 200;
  /* Only display on mobile */
  @media (min-width: ${screenSizeM}) {
    display: none;
  }
`

const MobileNavMenu = ({ toggle }) => (
  <Button classname="menu-button" onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </Button>
)

export default MobileNavMenu
