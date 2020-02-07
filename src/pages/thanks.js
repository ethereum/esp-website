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
          Your inquiry has been successfully submitted! The Ecosystem Support
          team will be reaching out within the next few business days with
          detailed information. Until then, kick back and relax.
        </p>
      </PageBody>
    </div>
  </>
)

export default ThankYouPage
