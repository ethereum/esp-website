import React from "react"
import styled from "styled-components"
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
  margin-right: 16px;

  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px ${colorGrayDark};
  transition: 0.4s ease-out;

  &:hover {
    color: black;
    transform: translateY(-2px);
  }

  @media (max-width: 824px) {
    flex: 0 1 324px;
  }
  @media (max-width: ${screenSizeS}) {
    flex: 1 1 140px;
    margin-right: 0px;
    margin-bottom: 24px;
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
