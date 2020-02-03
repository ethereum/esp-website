import React from "react"

import Airtable from "../components/airtable"
import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"

const ProjectPage = () => (
  <>
    <SEO title="Project Inquiry" />
    <PageBody>
      <Airtable form="project" />
    </PageBody>
  </>
)

export default ProjectPage
