import React, { useState, createRef } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

import Link from "./Link"
import TranslatedString from "./TranslatedString"

import { useOnClickOutside } from "../hooks/useOnClickOutside"
import * as styles from "../utils/styles"

const Dropdown = styled.div`
  padding: 0 0 10px 0;
`

const DropdownTitle = styled.span`
  color: ${styles.colorText};
  font-size: 18px;
  margin-right: 20px;
  display: inline-block;
  cursor: pointer;

  &:hover {
    color: ${styles.colorOrange};
    & > svg {
      color: ${styles.colorOrange};
    }
  }
`

const ChevronIcon = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
`

const DropdownList = styled(motion.ul)`
  margin: 0;
  position: absolute;
  margin-top: ${props => (props.hasSubNav ? `-4.5rem` : `-1rem`)};
  list-style-type: none;
  list-style-image: none;
  top: 100%;
  width: auto;
  border-radius: 0.5em;
  background: ${styles.colorWhite};
  border: 1px solid ${styles.colorGrayLight};
  padding: 0.5rem;
`

const listVariants = {
  open: {
    opacity: 1,
    rotateX: 0,
    display: "block",
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    rotateX: -15,
    transitionEnd: {
      display: "none",
    },
  },
}

const DropdownItem = styled.li`
  margin: 0;
  color: ${styles.colorText};
  &:hover {
    color: ${styles.colorOrange};
    background: ${styles.colorGrayLightest};
  }
`

// TODO move to SharedStyles
const NavLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  color: ${styles.colorText};
  svg {
    fill: ${styles.colorText};
  }
  &:hover {
    color: ${styles.colorOrange};
    svg {
      fill: ${styles.colorOrange};
    }
  }
`

const NavDropdown = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = createRef()

  useOnClickOutside(ref, () => setIsOpen(false))

  // Toggle on `enter` key
  const onKeyDownHandler = e => {
    if (e.keyCode === 13) {
      setIsOpen(!isOpen)
    }
  }

  const ariaLabel = section.ariaLabel || section.text

  const icon = isOpen ? faChevronUp : faChevronDown
  return (
    <Dropdown ref={ref} aria-label={ariaLabel}>
      <DropdownTitle
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={onKeyDownHandler}
        tabIndex="0"
      >
        <TranslatedString id={section.text} />
        <ChevronIcon icon={icon} size="xs" />
      </DropdownTitle>
      <DropdownList
        animate={isOpen ? "open" : "closed"}
        variants={listVariants}
        initial="closed"
      >
        {section.items.map((item, idx) => {
          return (
            <DropdownItem key={idx} onClick={() => setIsOpen(false)}>
              <NavLink to={item.to} tabIndex="-1">
                <TranslatedString id={item.text} />
              </NavLink>
            </DropdownItem>
          )
        })}
      </DropdownList>
    </Dropdown>
  )
}

export default NavDropdown
