import React from "react"

import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"
import { FormattedMessage, injectIntl } from "gatsby-plugin-intl"

const NotFoundPage = ({ intl }) => (
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

export default injectIntl(NotFoundPage)
