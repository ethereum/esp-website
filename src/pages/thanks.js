import React from "react"

import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"
import { FormattedMessage, injectIntl } from "gatsby-plugin-intl"


const ThankYouPage = ({ intl }) => (
  <>
    <SEO title="Thanks" />
    <div className="page-content">
      <PageBody>
        <h1>
        <FormattedMessage id="page-thanks.thanks" />                                                                
        </h1>
        <p>
        <FormattedMessage id="page-thanks.answer-p-1" />                                                               
        </p>
        <p>
        <FormattedMessage id="page-thanks.answer-p-2" />                                                               
        </p>
      </PageBody>
    </div>
  </>
)

export default injectIntl(ThankYouPage)

