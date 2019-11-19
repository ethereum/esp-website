import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ThankYouPage = () => (
  <Layout>
    <SEO title="Thanks" />
    <div className="page-content">
      <h1>Thank you!</h1>
      <p>
        Your inquiry has been received by the Ecosystem Support team. The
        submitted information will be read by us and we may be in touch to
        obtain more information and to better understand your needs.
      </p>
    </div>
  </Layout>
)

export default ThankYouPage
