import React from "react"

import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"

const NotFoundPage = () => (
  <>
    <SEO title="Page not found" />
    <PageBody>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn't exist... the sadness.</p>
    </PageBody>
  </>
)

export default NotFoundPage
