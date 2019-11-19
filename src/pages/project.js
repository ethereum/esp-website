import React from "react"
import Layout from "../components/layout"
import Airtable from "../components/airtable"
import SEO from "../components/seo"

const ProjectPage = () => (
  <Layout>
    <SEO title="Project Application" />
    <Airtable form="project" />
  </Layout>
)

export default ProjectPage
