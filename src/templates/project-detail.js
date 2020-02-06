import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import {
  PageHeader,
  PageBodyWide,
  CardImage,
  H1,
} from "../components/SharedStyledComponents"

const BodyContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
`

const ImageContainer = styled.div`
  width: 240px;
  /* flex: 0 0 240px; */

  /* display: flex; */
  /* flex-direction: column; */
`

const ContentContainer = styled.div`
  width: 100%;
  margin-left: 48px;
`

const Breadcrumbs = styled.div`
  margin-bottom: 56px;
`

const ProjectPage = ({ data }) => {
  const content = data.markdownRemark
  const { frontmatter } = content
  return (
    <>
      <SEO title="Uniswap" />
      <div>
        <PageHeader>
          <H1>Featured Projects</H1>
        </PageHeader>
        <PageBodyWide>
          <Breadcrumbs>
            <Link to="/projects/">
              <strong>{"<< "}</strong>
              Back to the list of featured projects
            </Link>
          </Breadcrumbs>
          <BodyContainer>
            <ImageContainer>
              <CardImage
                fluid={frontmatter.img.childImageSharp.fluid}
                alt="Ecosystem Support Program Process"
              />
              <h2>Status:</h2>
              <p>{frontmatter.status}</p>
              {frontmatter.latestUpdate && (
                <a href={frontmatter.latestUpdate}>Latest update</a>
              )}
            </ImageContainer>
            <ContentContainer>
              <h1>{content.frontmatter.title}</h1>
              <p>{frontmatter.category}</p>
              <p>{frontmatter.description}</p>
              <p>
                Grant Received: {frontmatter.grantAmount} in{" "}
                {frontmatter.grantYear}{" "}
              </p>
              <div dangerouslySetInnerHTML={{ __html: content.html }} />
            </ContentContainer>
          </BodyContainer>
        </PageBodyWide>
      </div>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        img {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        category
        description
        grantYear
        grantAmount
        status
        latestUpdate
      }
      fields {
        slug
      }
      html
    }
  }
`
export default ProjectPage
