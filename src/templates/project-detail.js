import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import {
  PageHeader,
  PageBodyWide,
  CardImage,
  LighterText,
  ButtonExternalLink,
  H1,
} from "../components/SharedStyledComponents"
import { screenSizeM } from "../utils/styles"

const BodyContainer = styled.div`
  display: flex;
  @media (max-width: ${screenSizeM}) {
    flex-direction: column;
  }
`

const ImageContainer = styled.div`
  flex: 0 0 240px;

  @media (max-width: ${screenSizeM}) {
    margin-bottom: 32px;
  }
`

const ContentContainer = styled.div`
  width: 100%;
  margin-left: 48px;
  @media (max-width: ${screenSizeM}) {
    margin-left: 0;
  }
`

const Breadcrumbs = styled.div`
  margin-bottom: 56px;
`

const Category = styled(LighterText)`
  @media (max-width: ${screenSizeM}) {
    text-align: center;
  }
`

const Title = styled.h1`
  @media (max-width: ${screenSizeM}) {
    text-align: center;
  }
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
                <ButtonExternalLink href={frontmatter.latestUpdate}>
                  Latest update
                </ButtonExternalLink>
              )}
            </ImageContainer>
            <ContentContainer>
              <Title>{content.frontmatter.title}</Title>

              <Category>
                <p>{frontmatter.category}</p>
              </Category>

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
