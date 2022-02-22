import React, { useState } from "react"

import PageMetadata from "../components/PageMetadata"
import { PageBody, FormHeader } from "../components/SharedStyledComponents"

const ExplorePage = () => {
  return (
    <>
      <PageMetadata
        title="Grantee Form"
        meta={[
          {
            name: "robots",
            content: "noindex",
          },
        ]}
      />
      <PageBody>
        <FormHeader>
          <h1>We'll be back soon</h1>
          <p>
            The site is currently under maintenance. We'll have our inquiry
            forms back within 24 hours. Please check back soon!
          </p>
        </FormHeader>
      </PageBody>
    </>
  )
}

export default ExplorePage
