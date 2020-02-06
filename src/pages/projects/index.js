import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import SEO from "../../components/seo"
import ProjectCard from "../../components/ProjectCard"
import {
  PageBodyWide,
  PageHeader,
  H1,
} from "../../components/SharedStyledComponents"

const Intro = styled.div`
  max-width: 600px;
  margin: 24px auto 48px;
`

const ProjectsPage = ({ data }) => {
  return (
    <>
      <SEO title="Featured Projects" />
      <div>
        <PageHeader>
          <H1>Featured Projects</H1>
        </PageHeader>
        <PageBodyWide>
          <Intro>
            <strong>
              <p>
                Get to know some of the projects that ESP is currently
                supporting!
              </p>
            </strong>
            <p>
              This is only a small sample – we’ll highlight a few at a time and
              rotate periodically, so make sure to check back once in a while
              for updates. We’ll tend to feature projects that are at least a
              few months old, so that we have some results to look back on as
              well as ongoing trajectory and remaining milestones.
            </p>
          </Intro>
          {data.allMarkdownRemark.edges.map(({ node }) => {
            return (
              <ProjectCard
                frontmatter={node.frontmatter}
                link={node.fields.slug}
              />
            )
          })}
        </PageBodyWide>
      </div>
    </>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___grantYear], order: ASC }) {
      totalCount
      edges {
        node {
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
          excerpt
        }
      }
    }
  }
`

export default ProjectsPage
