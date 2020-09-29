import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

import PageMetadata from "../../components/PageMetadata"
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

  // TODO move this filter to the query
  // filter to project pages && pages of current language
  const nodes = data.allMdx.edges.filter(({ node }) => {
    return (
      node.frontmatter.lang === intl.locale &&
      node.fields.slug.includes("/projects/")
    )
  })

  return (
    <>
      <PageMetadata title={intl.formatMessage({ id: "page-projects.title" })} />
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
          {nodes.map(({ node }, idx) => {
            return (
              <ProjectCard
                key={idx}
                frontmatter={node.frontmatter}
                to={node.fields.slug}
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
    allMdx(sort: { fields: [frontmatter___grantYear], order: ASC }) {
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
            lang
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
