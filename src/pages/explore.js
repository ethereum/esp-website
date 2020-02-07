import React from "react"

import Airtable from "../components/airtable"
import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"

const ExplorePage = () => (
  <>
    <SEO title="Explore Inquiry" />
    <PageBody>
      <Airtable form="explore" />
    </PageBody>
  </>
)

export default ExplorePage
