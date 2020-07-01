import React from "react"
import { FormattedMessage, useIntl, Link } from "gatsby-plugin-intl"

import TwitterFeed from "../components/TwitterFeed"
import NewsletterSignup from "../components/NewsletterSignup"
import UpcomingEvents from "../components/UpcomingEvents"
import PageMetadata from "../components/PageMetadata"
import {
  H1,
  H2,
  PageBody,
  PageHeader,
  Section,
} from "../components/SharedStyledComponents"

const AboutPage = () => {
  const intl = useIntl()

  return (
    <>
      <PageMetadata title={intl.formatMessage({ id: "page-about.title" })} />
      <div>
        <PageHeader>
          <H1>
            <FormattedMessage id="page-about.h1" />
          </H1>
        </PageHeader>
        <PageBody>
          <Section>
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
          </Section>
          <Section>
            <H2>
              <FormattedMessage id="page-about.recent-news" />
            </H2>
            {/* We chose not to translate "Recent news" given how frequently we update it. */}
            <p>
              <strong>May 12, 2020</strong>: Going forward we'll be releasing
              quarterly updates on financial support allocations. You can{" "}
              <a
                href="https://blog.ethereum.org/2020/05/07/ecosystem-support-program-allocation-update-q1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                find our Q1 2020 update here
              </a>
              .
            </p>
            <p>
              <strong>April 7, 2020</strong>: Check out our recent{" "}
              <a
                href="https://blog.ethereum.org/2020/04/01/ecosystem-support-program-allocation-update/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Allocation Update
              </a>{" "}
              for details on how we’ve spent our last few months and what we
              funded in 2019!
            </p>
          </Section>
          <Section>
            <TwitterFeed />
          </Section>
          <UpcomingEvents />
          <Section id="newsletter">
            <H2>
              <FormattedMessage id="page-home.updates" />
            </H2>
            <NewsletterSignup />
          </Section>
        </PageBody>
      </div>
    </>
  )
}

export default AboutPage
