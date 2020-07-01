import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

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

  const desc = description || intl.formatMessage({ id: "site-description" })

  return (
    <Helmet
      htmlAttributes={{ lang: intl.locale }}
      title={title}
      titleTemplate={`%s | ${intl.formatMessage({ id: "site-title" })}`}
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
