import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { StyledLink, CardImage } from "../components/SharedStyledComponents"
import { colorGray, colorMedGray } from "../utils/styles"

const Card = styled(Link)`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px ${colorMedGray};
  color: black;

  margin-bottom: 24px;
  padding: 8px;
  display: flex;
  justify-content: space-between;

  transition: 0.4s ease-out;

  &:hover {
    color: black;
    transform: translateY(-4px);
  }

  & > div {
    margin: 16px;
  }
`

const CardBody = styled.div`
  flex: 1 1 300px;
`

const CardGrant = styled.div`
  flex: 0 1 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const LighterText = styled.div`
  color: ${colorGray};
`

const DetailsLink = styled(StyledLink)`
  font-weight: bold;
`

const ProjectCard = ({ frontmatter, link }) => {
  return (
    <Card to={link}>
      <CardImage
        fluid={frontmatter.img.childImageSharp.fluid}
        alt="Ecosystem Support Program Process"
      />
      <CardBody>
        <h2>{frontmatter.title}</h2>
        <LighterText>
          <p>{frontmatter.category}</p>
        </LighterText>
        <div>{frontmatter.description}</div>
      </CardBody>
      <CardGrant>
        <div>
          <strong>Grant Received:</strong>
          <LighterText>
            {frontmatter.grantAmount} in {frontmatter.grantYear}
          </LighterText>
        </div>
        <DetailsLink to="/faq/">View Details</DetailsLink>
      </CardGrant>
    </Card>
  )
}

export default ProjectCard
