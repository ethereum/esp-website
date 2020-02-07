import React from "react"

import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"

const NotFoundPage = () => (
  <>
    <SEO title="Page not found" />
    <div className="page-content">
      <PageBody>
        <h1>Page not found</h1>
        <p>You just hit a route that doesn't exist... the sadness.</p>
      </PageBody>
    </div>
  </>
)

export default NotFoundPage
