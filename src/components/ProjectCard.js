import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import { StyledLink } from "../components/SharedStyledComponents"
import { colorGray } from "../utils/styles"

const Card = styled(Link)`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #c7c7c7;
  background-color: #ffffff;

  margin-bottom: 24px;
  padding: 8px;
  display: flex;
  justify-content: space-between;

  transition: 0.4s ease-out;

  &:hover {
    cursor: pointer;
    color: black;
    transform: translateY(-4px);
  }

  & > div {
    margin: 16px;
  }
`

const CardImage = styled(Img)`
  flex: 0 0 200px;
  border-radius: 10px;
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

const ProjectCard = ({ img, data }) => {
  return (
    <Card to="/faq/">
      <CardImage
        fluid={img.childImageSharp.fluid}
        alt="Ecosystem Support Program Process"
      />
      <CardBody>
        <h2>{data.name}</h2>
        <LighterText>
          <p>{data.category}</p>
        </LighterText>
        <div>{data.description}</div>
      </CardBody>
      <CardGrant>
        <div>
          <strong>Grant Received:</strong>
          <LighterText>
            {data.grantAmount} in {data.grantYear}
          </LighterText>
        </div>
        <DetailsLink to="/faq/">View Details</DetailsLink>
      </CardGrant>
    </Card>
  )
}

export default ProjectCard
