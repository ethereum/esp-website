import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

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
  const intl = useIntl()

  return (
    <>
      <SEO title={intl.formatMessage({ id: "page-projects.title" })} />
      <div>
        <PageHeader>
          <H1>
            <FormattedMessage id="page-projects.title" />
          </H1>
        </PageHeader>
        <PageBodyWide>
          <Intro>
            <strong>
              <p>
                <FormattedMessage id="page-projects.description" />
              </p>
            </strong>
            <p>
              <FormattedMessage id="page-projects.p" />
            </p>
          </Intro>
          {data.allMarkdownRemark.edges.map(({ node }, idx) => {
            return (
              <ProjectCard
                key={idx}
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
