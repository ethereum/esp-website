import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import Link from "./Link"
import { colorYellow, screenSizeM } from "../utils/styles"

const Container = styled.div`
  margin-bottom: 2rem;
`

const Arrow = styled.span`
  margin-right: 16px;
  color: ${colorYellow};
`

const Breadcrumbs = ({ to, copy, className }) => {
  return (
    <Container className={className}>
      <Arrow>
        <FontAwesomeIcon icon={faChevronLeft} />
        <FontAwesomeIcon icon={faChevronLeft} />
      </Arrow>
      <Link to={to}>{copy}</Link>
    </Container>
  )
}

export default Breadcrumbs
