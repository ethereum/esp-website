import React from "react"

import Airtable from "../components/airtable"
import SEO from "../components/seo"

const ExplorePage = () => (
  <>
    <SEO title="Explore Inquiry" />
    <Airtable form="explore" />
  </>
)

export default ExplorePage
