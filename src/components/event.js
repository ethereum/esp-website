import React from "react"
import styled from "styled-components"
import { colorOrange, colorGrayLight, screenSizeM } from "../utils/styles"

const Title = styled.h4`
  margin-bottom: 0;
  color: ${colorOrange};
`

const Subtitle = styled.div`
  color: ${colorGrayLight};
`

const StyledEvent = styled.div`
  max-width: 232px;

  @media (max-width: ${screenSizeM}) {
    max-width: 100%;
  }
`
// TODO add actual content
const Event = () => (
  <StyledEvent>
    <Title>Event Name here</Title>
    <Subtitle>March 3, 2020</Subtitle>
    <p>
      Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient
      montes.
    </p>
    <strong>
      <a href="">View Details</a>
    </strong>
  </StyledEvent>
)

export default Event
