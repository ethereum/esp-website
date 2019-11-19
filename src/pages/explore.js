import React from "react"
import Layout from "../components/layout"
import Airtable from "../components/airtable"
import SEO from "../components/seo"

const ExplorePage = () => (
  <Layout>
    <SEO title="Explore Inquiry" />
    <Airtable form="explore" />
  </Layout>
)

export default ExplorePage
