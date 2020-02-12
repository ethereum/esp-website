import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons"

import SEO from "../components/seo"
import {
  PageHeader,
  PageBodyWide,
  CardImage,
  LighterText,
  ButtonExternalLink,
  H1,
} from "../components/SharedStyledComponents"
import { screenSizeM, screenSizeL, colorYellow } from "../utils/styles"

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

const HideDesktop = styled.div`
  margin-top: 1.5rem;
  @media (min-width: ${screenSizeM}) {
    display: none;
  }
`

const HideMobile = styled.div`
  @media (max-width: ${screenSizeM}) {
    display: none;
  }
`

const Breadcrumbs = styled.div`
  margin-bottom: 56px;
  @media (max-width: ${screenSizeM}) {
    margin-bottom: 32px;
  }
`

const Arrow = styled.span`
  margin-right: 16px;
  color: ${colorYellow};
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
`

const Category = styled(LighterText)`
  @media (max-width: ${screenSizeM}) {
    text-align: center;
  }
`

const Title = styled.h1`
  margin-bottom: 8px;
  @media (max-width: ${screenSizeL}) {
    margin-bottom: 1rem;
  }
`

const DescriptionContainer = styled.div`
  max-width: 580px;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${screenSizeL}) {
    flex-direction: column;
  }
`

const Description = styled.p`
  margin-right: 1rem;
  @media (min-width: ${screenSizeL}) {
    flex: 1 0 360px;
  }
`

const Status = styled.h2`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`

const ExternalIcon = styled(FontAwesomeIcon)`
  margin-left: 8px;
`

const ProjectPage = ({ data }) => {
  const content = data.markdownRemark
  const { frontmatter } = content

  const mainContent = () => {
    return (
      <>
        <Header>
          <Title>{content.frontmatter.title}</Title>
          <Category>
            <p>{frontmatter.category}</p>
          </Category>
        </Header>

        <DescriptionContainer>
          <Description>{frontmatter.description}</Description>
          <p>
            <strong>Grant Received:</strong>
            <br />
            {frontmatter.grantAmount} in {frontmatter.grantYear}
          </p>
        </DescriptionContainer>
      </>
    )
  }

  return (
    <>
      <SEO title={frontmatter.title} />
      <div>
        <PageHeader>
          <H1>Featured Projects</H1>
        </PageHeader>
        <PageBodyWide>
          <Breadcrumbs>
            <Arrow>
              <FontAwesomeIcon icon={faChevronLeft} />
              <FontAwesomeIcon icon={faChevronLeft} />
            </Arrow>
            <Link to="/projects/">Back to featured projects list</Link>
          </Breadcrumbs>
          <BodyContainer>
            <ImageContainer>
              <CardImage
                fluid={frontmatter.img.childImageSharp.fluid}
                alt="Ecosystem Support Program Process"
              />
              <HideDesktop>{mainContent()}</HideDesktop>
              <Status>Status:</Status>
              <p>{frontmatter.status}</p>
              {frontmatter.latestUpdate && (
                <ButtonExternalLink
                  href={frontmatter.latestUpdate}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Latest update <ExternalIcon icon={faExternalLinkAlt} />
                </ButtonExternalLink>
              )}
            </ImageContainer>
            <ContentContainer>
              <HideMobile>{mainContent()}</HideMobile>
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
