import React from "react"
import styled from "styled-components"
import {
  colorOrange,
  colorRed,
  colorGrayLight,
  colorGrayDark,
  colorGrayDarkest,
  screenSizeM,
} from "../utils/styles"

const Title = styled.h4`
  margin-bottom: 8px;
  color: ${colorGrayDarkest};
`

const Subtitle = styled.div`
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

const StyledEvent = styled.a`
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex: 0 1 232px;
  padding: 16px;
  margin-bottom: 32px;

  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px ${colorGrayDark};
  transition: 0.4s ease-out;

  &:hover {
    color: black;
    transform: translateY(-2px);
  }

  @media (max-width: ${screenSizeM}) {
    max-width: 100%;
  }
`
const Event = ({ title, dates, url }) => (
  <StyledEvent target="_blank" rel="noopener noreferrer" href={url}>
    <div>
      <Title>{title}</Title>
      <Subtitle>{dates}</Subtitle>
    </div>
    <FakeLink>View Website</FakeLink>
  </StyledEvent>
)

export default Event
