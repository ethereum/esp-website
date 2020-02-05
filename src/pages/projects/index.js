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

const featuredProjects = [
  {
    img: "circomImg",
    name: "Circom",
    category: "Zero Knowledge Proof R&D",
    description:
      "A robust and scalable language for complex zkSNARK circuit design.",
    grantYear: "2019",
    grantAmount: "$72,363",
  },
  {
    img: "uniswapImg",
    name: "Uniswap",
    category: "Usability - end user",
    description:
      "Automated market maker designed around ease of use, gas efficiency, and decentralization.",
    grantYear: "2018",
    grantAmount: "$50,000 + 120 ETH for security audit",
  },
  {
    img: "placeholderImg",
    name: "ethers.js",
    category: "Developer experience",
    description:
      "A complete and compact JavaScript library for interacting with Ethereum.",
    grantYear: "2019",
    grantAmount: "$25,000",
  },
  {
    img: "ethereumOnArmImg",
    name: "Ethereum on ARM",
    category: "Usability - miner/validator",
    description:
      "Custom Linux images to automatically turn resource constrained devices into full Ethereum nodes.",
    grantYear: "2019",
    grantAmount: "$20,000",
  },
  {
    img: "placeholderImg",
    name: "Nethermind",
    category: "Eth 1.0 usability",
    description: ".NET Core client for Ethereum 1.0",
    grantYear: "2019",
    grantAmount: "$50,000",
  },
  {
    img: "turboGethImg",
    name: "Turbo-Geth",
    category: "Eth 1.0 scalability/sustainability",
    description: "Optimized go-ethereum client.",
    grantYear: "2018",
    grantAmount: "$25,000",
  },
]

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
          {featuredProjects.map(project => {
            return <ProjectCard data={project} img={data[project.img]} />
          })}
        </PageBodyWide>
      </div>
    </>
  )
}

// Graphql query can't be dynamic so we pass image file to component
// vs. querying image from ProjectCard component
export const query = graphql`
  query {
    circomImg: file(relativePath: { eq: "projects/circom.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethereumOnArmImg: file(
      relativePath: { eq: "projects/ethereum-on-arm.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    placeholderImg: file(
      relativePath: { eq: "projects/placeholder-logo.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    turboGethImg: file(relativePath: { eq: "projects/turbo-geth.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    uniswapImg: file(relativePath: { eq: "projects/uniswap.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default ProjectsPage
