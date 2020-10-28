import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import Link from "../components/Link"
import LocalGrantsForm from "../components/LocalGrantsForm"
import PageMetadata from "../components/PageMetadata"
import { PageBody } from "../components/SharedStyledComponents"
import * as styles from "../utils/styles"

const Header1 = styled.h1`
  font-size: 2.5rem;
  @media (max-width: ${styles.screenSizeM}) {
    font-size: 2rem;
  }
  margin-bottom: 2.5rem;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 140px;
    margin-top: -140px;
    visibility: hidden;
  }

  /* Hide anchor link */
  a {
    display: none;
  }
`

const Header2 = styled.h2`
  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  margin: 2.5rem 0;
  font-size: 2rem;
  @media (max-width: ${styles.screenSizeM}) {
    font-size: 1.5rem;
  }

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }

  /* Anchor tag styles */
  a {
    position: relative;
    display: none;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      /* fill: ${props => props.theme.colors.primary}; */
    }
  }

  &:hover {
    a {
      display: initial;
      /* fill: ${props => props.theme.colors.primary}; */
    }
  }

  /* @media (max-width: ${props => props.theme.breakpoints.m}) {
    font-size: 1.25rem;
  } */
`

const Header3 = styled.h3`
  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  margin: 2rem 0;
  font-size: 1.5rem;
  @media (max-width: ${styles.screenSizeM}) {
    font-size: 1.25rem;
  }

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }

  /* Anchor tag styles */
  a {
    position: relative;
    display: none;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      /* fill: ${props => props.theme.colors.primary}; */
    }
  }

  &:hover {
    a {
      display: initial;
      /* fill: ${props => props.theme.colors.primary}; */
    }
  }
`

const Header4 = styled.h4`
  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }

  /* Anchor tag styles */
  a {
    position: relative;
    display: none;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      /* fill: ${props => props.theme.colors.primary}; */
    }
  }

  &:hover {
    a {
      display: initial;
      /* fill: ${props => props.theme.colors.primary}; */
    }
  }
`

// Passing components to MDXProvider allows use across all .md/.mdx files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: Header1,
  h2: Header2,
  h3: Header3,
  h4: Header4,
  LocalGrantsForm,
}

const HeroImg = styled(Img)`
  margin-bottom: ${props => (props.hasImgMargin ? `3rem` : `0`)};
`

const StaticPage = ({ location, data: { mdx } }) => {
  const hasImgMargin = location.pathname.includes("/local-grants/colombia")
  return (
    <>
      <PageMetadata
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      <PageBody>
        {mdx.frontmatter.img && (
          <HeroImg
            fluid={mdx.frontmatter.img.childImageSharp.fluid}
            alt={mdx.frontmatter.imgAlt}
            hasImgMargin={hasImgMargin}
          />
        )}
        <MDXProvider components={components}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </PageBody>
    </>
  )
}

export const staticPageQuery = graphql`
  query StaticPageQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        img {
          childImageSharp {
            fluid(maxWidth: 748) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imgAlt
        title
        description
      }
      body
    }
  }
`

export default StaticPage
