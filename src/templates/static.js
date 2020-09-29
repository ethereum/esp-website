import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

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
