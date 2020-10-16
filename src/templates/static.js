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

// Passing components to MDXProvider allows use across all .md/.mdx files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  LocalGrantsForm,
}

const HeroImg = styled(Img)`
  margin-bottom: ${props => (props.hasImgMargin ? `3rem` : `0`)};
`

const StaticPage = ({ location, data: { mdx } }) => {
  const hasImgMargin = location.pathname === "/en/local-grants/colombia"
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
