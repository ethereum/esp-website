import React from "react"
import { graphql } from "gatsby"

import PageMetadata from "../components/PageMetadata"
import { PageBody } from "../components/SharedStyledComponents"

const StaticPage = ({ data }) => {
  const content = data.markdownRemark
  const { frontmatter } = content

  return (
    <>
      <PageMetadata title={frontmatter.title} />
      <PageBody>
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
      }
      fields {
        slug
      }
      html
    }
  }
`
export default StaticPage
