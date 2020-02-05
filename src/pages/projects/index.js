import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import SEO from "../../components/seo"
import {
  PageBodyWide,
  PageHeader,
  H1,
  // StyledLink,
} from "../../components/SharedStyledComponents"

const Card = styled(Link)`
  /* width: 100%; */
  /* min-height: 232px; */
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #c7c7c7;
  background-color: #ffffff;

  margin-bottom: 24px;
  padding: 8px;
  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    color: black;
  }

  & > div {
    margin: 16px;
  }
`

const CardImage = styled.div`
  flex: 0 1 200px;
`

const CardBody = styled.div`
  /* flex: 1 1 300px; */
`

const ProjectsPage = ({ data }) => {
  return (
    <>
      <SEO title="Featured Projects" />
      <div>
        <PageHeader>
          <H1>Featured Projects</H1>
        </PageHeader>
        <PageBodyWide>
          <Card to="/faq/">
            <CardImage>
              <Img
                className="process-img"
                fluid={data.file.childImageSharp.fluid}
                alt="Ecosystem Support Program Process"
              />
            </CardImage>
            <CardBody>
              <h3>Circom</h3> Zero Knowledge Proof R&amp;D
              <div>
                A robust and scalable language for complex zkSNARK circuit
                design.
              </div>
            </CardBody>
            <div>
              <strong>Grant Received:</strong>
              <br />
              $72,363.00 in 2019
            </div>
          </Card>
          <Card to="/faq/">
            <CardImage>
              <Img
                className="process-img"
                fluid={data.file.childImageSharp.fluid}
                alt="Ecosystem Support Program Process"
              />
            </CardImage>
            <CardBody>
              <h3>Circom</h3> Zero Knowledge Proof R&amp;D
              <div>
                A robust and scalable language for complex zkSNARK circuit
                design.
              </div>
            </CardBody>
            <div>
              <strong>Grant Received:</strong>
              <br />
              $72,363.00 in 2019
            </div>
          </Card>
          <Card to="/faq/">
            <CardImage>
              <Img
                className="process-img"
                fluid={data.file.childImageSharp.fluid}
                alt="Ecosystem Support Program Process"
              />
            </CardImage>
            <CardBody>
              <h3>Circom</h3> Zero Knowledge Proof R&amp;D
              <div>
                A robust and scalable language for complex zkSNARK circuit
                design.
              </div>
            </CardBody>
            <div>
              <strong>Grant Received:</strong>
              <br />
              $72,363.00 in 2019
            </div>
          </Card>
        </PageBodyWide>
      </div>
    </>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "uniswap.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default ProjectsPage
