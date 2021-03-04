import React, { useState } from "react"
import styled from "styled-components"
import { FakeLink } from "./SharedStyledComponents"
import * as styles from "../utils/styles"

const Card = styled.div`
  border: 1px solid ${styles.colorGrayLighter};
  border-radius: 2px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  &:hover {
    background-color: ${styles.colorGrayLightest};
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h3`
  margin-top: 0rem;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const TextPreview = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${styles.colorText};
  margin-bottom: 0rem;
`

const Text = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${styles.colorText};
  margin-top: 2rem;
  border-top: 1px solid ${styles.colorGrayLighter};
  padding-top: 1.5rem;
`

const Question = styled.div`
  margin-right: 1rem;
`

const ButtonContainer = styled.div`
  margin-left: 1rem;
`

const ExpandableCard = ({ children, contentPreview, title }) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Card>
      <Content>
        <Question>
          <Title>{title}</Title>
          <TextPreview>{contentPreview}</TextPreview>
        </Question>
        <ButtonContainer onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <FakeLink>Less</FakeLink> : <FakeLink>More</FakeLink>}
        </ButtonContainer>
      </Content>
      {isVisible && <Text>{children}</Text>}
    </Card>
  )
}

export default ExpandableCard
