import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import * as styles from "../utils/styles"

const Content = styled(motion.div)`
  padding: 20px;
  transform-origin: top center;
  @media (max-width: 600px) {
    padding-left: 20px;
  }
`

const Header = styled(motion.header)`
  display: flex;
  border-radius: 4px;
  cursor: pointer;
  padding: 16px;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.25s ease-in-out;
`
const Icon = styled(FontAwesomeIcon)`
  margin-right: 16px;
  color: ${styles.colorYellow};
`

const Section = styled(motion.section)`
  overflow: hidden;
`

// TODO needed?
const Container = styled.div`
  overflow: hidden;
`

const AccordionSection = ({
  i,
  expanded,
  setExpanded,
  headerText,
  children,
}) => {
  const isOpen = expanded[i] === true
  const icon = isOpen ? faMinus : faPlus

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <Container>
      <Header
        initial={false}
        animate={{
          backgroundColor: isOpen ? styles.colorWhite : styles.colorWhite,
          color: isOpen ? styles.colorGrayDarkest : styles.colorGrayDarkest,
        }}
        onClick={() => setExpanded({ ...expanded, [i]: isOpen ? false : true })}
      >
        <span>
          <Icon icon={icon} />
        </span>
        <span>{headerText}</span>
      </Header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <Section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <Content
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.8 }}
              className="accordion-content"
            >
              {children}
            </Content>
          </Section>
        )}
      </AnimatePresence>
    </Container>
  )
}

export default AccordionSection
