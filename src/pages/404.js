import React from "react"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"

const NotFoundPage = () => {
  const intl = useIntl()

  return (
    <>
      <SEO title={intl.formatMessage({ id: "page-404.title" })} />
      <div className="page-content">
        <PageBody>
          <h1>
            <FormattedMessage id="page-404.title" />
          </h1>
          <p>
            <FormattedMessage id="page-404.body" />
          </p>
        </PageBody>
      </div>
    </>
  )
}

export default NotFoundPage
