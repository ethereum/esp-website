import React from "react"

import SEO from "../components/seo"
import { PageBodyNoBanner } from "../components/SharedStyledComponents"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

const ThankYouPage = () => {
  const intl = useIntl()

  return (
    <>
      <SEO title={intl.formatMessage({ id: "page-thanks.title" })} />
      <PageBodyNoBanner>
        <h1>
          <FormattedMessage id="page-thanks.h1" />
        </h1>
        <p>
          <FormattedMessage id="page-thanks.p-1" />
        </p>
        <p>
          <FormattedMessage id="page-thanks.p-2" />
        </p>
      </PageBodyNoBanner>
    </>
  )
}

export default ThankYouPage
