import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import PageMetadata from "../components/PageMetadata"
import { PageBody } from "../components/SharedStyledComponents"

const StaticPage = ({ data }) => {
  const content = data.markdownRemark
  const { frontmatter } = content

  return (
    <>
      <PageMetadata title={frontmatter.title} />
      <PageBody>
        {frontmatter.img && (
          <Img
            fluid={frontmatter.img.childImageSharp.fluid}
            alt="Ecosystem Support Program Process"
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: content.html }} />
      </PageBody>
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
            fluid(maxWidth: 748) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
      }
      html
    }
  }
`
export default StaticPage
