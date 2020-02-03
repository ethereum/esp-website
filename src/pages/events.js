import React from "react"

import Pinboard from "../components/pinboard"
import SEO from "../components/seo"

const EventsPage = () => (
  <>
    <SEO title="Current Events" />
    <div className="page-content">
      <Pinboard />
    </div>
  </>
)

export default EventsPage
