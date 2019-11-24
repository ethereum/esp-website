import React from "react"

import Airtable from "../components/airtable"
import SEO from "../components/seo"

const ProjectPage = () => (
  <>
    <SEO title="Project Inquiry" />
    <Airtable form="project" />
  </>
)

export default ProjectPage
