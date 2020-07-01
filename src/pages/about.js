import React from "react"
import { FormattedMessage, useIntl, Link } from "gatsby-plugin-intl"

import SEO from "../components/seo"
import {
  PageBody,
  PageHeader,
  H1,
  H2,
} from "../components/SharedStyledComponents"

const AboutPage = () => {
  const intl = useIntl()

  return (
    <>
      <SEO title={intl.formatMessage({ id: "page-about.title" })} />
      <div>
        <PageHeader>
          <H1>
            <FormattedMessage id="page-about.h1" />
          </H1>
        </PageHeader>
        <PageBody>
          <H2>
            <FormattedMessage id="page-about.h2" />
          </H2>
          <p>
            <FormattedMessage id="page-about.mission-1" />
          </p>
          <p>
            <FormattedMessage id="page-about.mission-2" />
          </p>
          <p>
            <i>
              <FormattedMessage id="page-about.mission-3" />
            </i>
          </p>

          <p>
            <FormattedMessage id="page-about.mission-4" />,{" "}
            <Link to="/project/">
              <FormattedMessage id="get-in-touch" />
            </Link>
          </p>
        </PageBody>
      </div>
    </>
  )
}

export default AboutPage
