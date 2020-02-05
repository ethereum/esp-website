import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"

const ProjectPage = ({ data }) => {
  const post = data.markdownRemark
  debugger
  return (
    <>
      <SEO title="Uniswap" />
      <PageBody>
        <Link to="/projects/">Back to the list of featured projects</Link>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </PageBody>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
export default ProjectPage
