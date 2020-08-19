import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { Location } from "@reach/router"

import { getDefaultMessage, supportedLanguages } from "../utils/translations"

const PageMetadata = ({ description, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            url
            image
          }
        }
      }
    `
  )

  const intl = useIntl()

  const desc =
    description ||
    intl.formatMessage({
      id: "site-description",
      defaultMessage: getDefaultMessage("site-description"),
    })

  const siteTitle = intl.formatMessage({
    id: "site-title",
    defaultMessage: getDefaultMessage("site-title"),
  })

  return (
    <Location>
      {({ location }) => {
        {/* Set canonocial URL to use language path to avoid duplicate content */}
        {/* e.g. set esp.ethereum.foundation/about/ to esp.ethereum.foundation/en/about/ */}
        const { pathname } = location
        let canonicalPath = pathname
        const firstDirectory = canonicalPath.split("/")[1]
        if (!supportedLanguages.includes(firstDirectory)) {
          canonicalPath = `/en${pathname}`
        }
        const canonical = `${site.siteMetadata.url}${canonicalPath}`

        return (
          <Helmet
            htmlAttributes={{ lang: intl.locale }}
            title={title}
            titleTemplate={`%s | ${siteTitle}`}
            link={[{ rel: "canonical", key: canonical, href: canonical }]}
            meta={[
              {
                name: `description`,
                content: desc,
              },
              {
                name: `image`,
                content: site.siteMetadata.image,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: desc,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: site.siteMetadata.author,
              },
              {
                name: `twitter:site`,
                content: site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: desc,
              },
              {
                property: `og:url`,
                content: site.siteMetadata.url,
              },
              {
                property: `og:image`,
                content: site.siteMetadata.image,
              },
            ].concat(meta)}
          />
        )
      }}
    </Location>
  )
}

PageMetadata.defaultProps = {
  meta: [],
  description: ``,
  title: ``,
}

PageMetadata.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default PageMetadata
