import React from "react"
import { useIntl } from "gatsby-plugin-intl"

import PageMetadata from "../components/PageMetadata"
import { PageBody, FormHeader } from "../components/SharedStyledComponents"

const InquirePage = () => {
  const intl = useIntl()

  return (
    <>
      <PageMetadata title={intl.formatMessage({ id: "page-inquire.title" })} />
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

export default InquirePage
