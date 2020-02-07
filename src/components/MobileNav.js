import React from "react"
import { useEffect, useRef } from "react"
import { motion, useCycle } from "framer-motion"
import { MenuToggle } from "./MenuToggle"
import { Navigation } from "./Navigation"
import styled from "styled-components"
import { screenSizeS } from "../utils/styles"

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
const useDimensions = ref => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth
    dimensions.current.height = ref.current.offsetHeight
  }, [])

  return dimensions.current
}

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 10,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(24px at 50px 50px)",
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
  width: 100%;
  /* background: #fff; */
  background: #ececec;
  z-index: 10;

  /* TODO fix, prevent scroll */
  height: 100vh;
  overflow-y: hidden;
`

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;

  /* Display desktop nav */
  @media (min-width: ${screenSizeS}) {
    display: none;
  }
`

const MobileNav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  return (
    <Nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <Background variants={sidebar} />
      <Navigation isOpen={isOpen} toggle={() => toggleOpen()} />
      <MenuToggle toggle={() => toggleOpen()} />
    </Nav>
  )
}

export default MobileNav
