import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import {
  CardImage,
  LightText,
  LighterText,
} from "../components/SharedStyledComponents"
import {
  colorGrayDark,
  colorOrange,
  colorRed,
  screenSizeL,
  screenSizeM,
} from "../utils/styles"

const Card = styled(Link)`
  max-height: 600px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px ${colorGrayDark};
  color: black;

  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${screenSizeM}) {
    flex-direction: column;
  }

  transition: 0.4s ease-out;

  &:hover {
    color: black;
    transform: translateY(-2px);
  }

  & > div {
    margin: 24px;
  }
`

const CardBody = styled.div`
  flex: 1 1 300px;
`

const CardTitle = styled.div`
  font-size: 1.62671rem;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 8px;
  white-space: nowrap;

  @media (max-width: ${screenSizeM}) {
    text-align: center;
  }

  @media (max-width: ${screenSizeL}) {
    margin-bottom: 16px;
  }
`

const CardGrant = styled.div`
  flex: 0 1 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CardCategory = styled(LighterText)`
  margin-bottom: 16px;
  white-space: nowrap;

  @media (max-width: ${screenSizeM}) {
    text-align: center;
  }
`

const DetailsLink = styled.div`
  font-weight: bold;
  color: ${colorOrange};
  text-decoration: none;
  opacity: 1;
  outline: none;

  &:hover {
    text-decoration: none;
    color: ${colorRed};
  }

  @media (max-width: ${screenSizeM}) {
    text-align: center;
  }
`

const ProjectCard = ({ frontmatter, link }) => {
  return (
    <Card to={link}>
      <CardImage
        fluid={frontmatter.img.childImageSharp.fluid}
        alt="Ecosystem Support Program Process"
      />
      <CardBody>
        <CardTitle>{frontmatter.title}</CardTitle>
        <CardCategory>{frontmatter.category}</CardCategory>
        <div>{frontmatter.description}</div>
      </CardBody>
      <CardGrant>
        <div>
          <strong>Grant Received:</strong>
          <LightText>
            {frontmatter.grantAmount} in {frontmatter.grantYear}
          </LightText>
        </div>
        <DetailsLink>View Details</DetailsLink>
      </CardGrant>
    </Card>
  )
}

export default ProjectCard
