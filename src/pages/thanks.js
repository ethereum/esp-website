import React from "react"

import SEO from "../components/seo"
import { PageBody } from "../components/SharedStyledComponents"

const ThankYouPage = () => (
  <>
    <SEO title="Thanks" />
    <div className="page-content">
      <PageBody>
        <h1>Thank you!</h1>
        <p>
          Your inquiry has been received by the Ecosystem Support team. The
          submitted information will be read by us and we may be in touch to
          obtain more information and to better understand your needs.
        </p>
      </PageBody>
    </div>
  </>
)

export default ThankYouPage
