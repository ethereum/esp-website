import React from "react"

import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"
import { FormattedMessage, injectIntl } from "gatsby-plugin-intl"


const NotFoundPage = ({ intl }) => (
  <>
    <SEO title="Page not found" />
    <div className="page-content">
      <PageBody>
        <h1>
        <FormattedMessage id="page-404.404.h1" />                                                                
        </h1>
        <p>
        <FormattedMessage id="page-404.404.errr" />                                                                
        </p>
      </PageBody>
    </div>
  </>
)

export default injectIntl(NotFoundPage)

