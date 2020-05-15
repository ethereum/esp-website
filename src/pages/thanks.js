import React from "react"

import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

const ThankYouPage = () => {
  const intl = useIntl()

  return (
    <>
      <SEO title={intl.formatMessage({ id: "page-thanks.title" })} />
      <div className="page-content">
        <PageBody>
          <h1>
            <FormattedMessage id="page-thanks.h1" />
          </h1>
          <p>
            <FormattedMessage id="page-thanks.p-1" />
          </p>
          <p>
            <FormattedMessage id="page-thanks.p-2" />
          </p>
        </PageBody>
      </div>
    </>
  )
}

export default ThankYouPage
