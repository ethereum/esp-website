import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import PageMetadata from "../components/PageMetadata"
import { PageBody } from "../components/SharedStyledComponents"

const components = {}

const StaticPage = ({ data: { mdx } }) => {
  return (
    <>
      <PageMetadata
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      <PageBody>
        {mdx.frontmatter.img && (
          <Img
            fluid={mdx.frontmatter.img.childImageSharp.fluid}
            alt={mdx.frontmatter.imgAlt}
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
