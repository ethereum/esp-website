import React from "react"

import PageMetadata from "../components/PageMetadata"
import { PageBodyNoBanner } from "../components/SharedStyledComponents"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

const ThankYouPage = () => {
  const intl = useIntl()

  return (
    <>
      <PageMetadata title={intl.formatMessage({ id: "page-thanks.title" })} />
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
