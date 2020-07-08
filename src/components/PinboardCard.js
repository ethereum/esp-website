import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import showdown from "showdown"

import { ButtonExternalLink } from "./SharedStyledComponents"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { useKeyPress } from "../hooks/useKeyPress"
import {
  colorOrange,
  colorRed,
  colorGrayLight,
  colorGrayDark,
  colorGrayDarkest,
  screenSizeS,
} from "../utils/styles"

const Title = styled.h4`
  margin-bottom: 8px;
  color: ${colorGrayDarkest};
`

const Subtitle = styled.p`
  color: ${colorGrayLight};
`

const FakeLink = styled.div`
  cursor: pointer;
  font-weight: bold;
  color: ${colorOrange};

  &:hover {
    color: ${colorRed};
  }
`

const StyledOverlay = styled(motion.div)`
  cursor: pointer;
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  will-change: opacity;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`

const Overlay = ({ isActive }) => {
  return (
    <StyledOverlay
      initial={false}
      animate={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 300 : -1 }}
      transition={{ duration: 0.2 }}
    />
  )
}

const openSpring = { type: "spring", stiffness: 100, damping: 30 }
const closeSpring = { type: "spring", stiffness: 100, damping: 35 }

const Card = styled(motion.div)`
  height: 200px;
  flex: 0 1 45%;
  margin-bottom: 32px;
  margin-right: 32px;

  @media (max-width: 824px) {
    flex: 0 1 324px;
  }
  @media (max-width: ${screenSizeS}) {
    flex: 1 1 200px;
    margin-right: 0px;
    margin-bottom: 24px;
  }
`

// Modal container
const CardContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  pointer-events: none;

  &.open {
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 1000;
    overflow-y: hidden;
    padding: 10% 0;
  }
`

const CardContent = styled(motion.div)`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px ${colorGrayDark};
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background: #fcf3d9;
  }

  z-index: 0;
  transform: none;
  pointer-events: auto;
  position: relative;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  &.open {
    padding: 0;
    background: #ffffff;
    height: auto;
    max-height: 100%;
    z-index: 1000;
    max-width: 700px;
    cursor: auto;
  }
`

const CardCopy = styled.div`
  height: 100%;
  &.open {
    padding: 1.5rem 1.5rem 0;
    overflow-y: scroll;

    /* Make scrollbar always visible */
    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 0.5rem;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => (props.isModalOpen ? `2rem` : `0`)};
`

const CardIcon = styled(FontAwesomeIcon)`
  z-index: 2000;
  cursor: pointer;
`

const ButtonContainer = styled.div`
  bottom: 0;
  position: sticky;
  margin: 1rem 1.5rem 1.5rem;
`

const PinboardCard = ({ pin }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const ref = useRef()

  // Close modal on outside clicks & `Escape` keypress
  useOnClickOutside(ref, () => setModalOpen(false))
  useKeyPress(`Escape`, () => setModalOpen(false))

  const markdownConverter = new showdown.Converter({
    openLinksInNewWindow: true,
  })

  const title = pin.fields["Title"]
  let desc = pin.fields["Short Description"]
  let longDesc = pin.fields["Long Description"]
  if (longDesc) {
    // Airtable appears to escape all markdown chars with backslashes
    longDesc = longDesc.replace(/\\/gi, "")
  }
  if (desc) {
    // Airtable appears to escape all markdown chars with backslashes
    desc = desc.replace(/\\/gi, "")
  }
  const truncatedDesc =
    desc.length > 90 ? desc.slice(0, 90).trim() + "..." : desc

  const toggleModal = e => {
    // If user clicks on "X" icon, close modal
    if (e.target.tagName === "path") {
      setModalOpen(false)
    } else {
      setModalOpen(true)
    }
  }

  return (
    <Card>
      <Overlay isActive={isModalOpen} />
      <CardContentContainer className={isModalOpen ? "open" : "closed"}>
        <CardContent
          ref={ref}
          className={isModalOpen ? "open" : "closed"}
          layoutTransition={isModalOpen ? openSpring : closeSpring}
          onClick={toggleModal}
        >
          <CardCopy className={isModalOpen ? "open" : "closed"}>
            <CardHeader isModalOpen={isModalOpen}>
              <Title>{title}</Title>
              {isModalOpen && <CardIcon icon={faTimes} size="lg" />}
            </CardHeader>
            {!isModalOpen && (
              <Subtitle
                dangerouslySetInnerHTML={{
                  __html: markdownConverter.makeHtml(truncatedDesc),
                }}
              />
            )}
            {isModalOpen && (
              <Subtitle
                dangerouslySetInnerHTML={{
                  __html: markdownConverter.makeHtml(desc),
                }}
              />
            )}
            {isModalOpen && (
              <Subtitle
                dangerouslySetInnerHTML={{
                  __html: markdownConverter.makeHtml(longDesc),
                }}
              />
            )}
            {!isModalOpen && <FakeLink>View Details</FakeLink>}
          </CardCopy>
          {isModalOpen && (
            <ButtonContainer>
              <ButtonExternalLink
                href="https://esp-pinboard.paperform.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply
              </ButtonExternalLink>
            </ButtonContainer>
          )}
        </CardContent>
      </CardContentContainer>
    </Card>
  )
}

export default PinboardCard
