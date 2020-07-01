import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as IntlLink } from "gatsby-plugin-intl"
import styled from "styled-components"
import * as styles from "../utils/styles"

// TODO pull from gatsby-config.js
const supportedLanguages = [`en`]

const ExternalLink = styled.a`
  color: ${styles.colorOrange};
  text-decoration: none;
  opacity: 1;
  outline: none;

  &:hover {
    text-decoration: none;
    color: ${styles.colorRed};
  }
`
const InternalLink = styled(IntlLink)`
  color: ${styles.colorOrange};
  text-decoration: none;
  opacity: 1;
  outline: none;

  &:hover {
    text-decoration: none;
    color: ${styles.colorRed};
  }

  &.active {
    color: ${styles.colorOrange};
  }
`

const Link = ({ to, children, className, isPartiallyActive = true }) => {
  const isExternal = to.includes("http") || to.includes("mailto:")

  if (isExternal) {
    return (
      <ExternalLink
        className={className}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </ExternalLink>
    )
  }

  // If lang path has been explicitly set, use Gatsby's Link
  const langPath = to.split("/")[1]
  if (supportedLanguages.includes(langPath)) {
    return (
      <GatsbyLink
        className={className}
        to={to}
        activeClassName="active"
        partiallyActive={isPartiallyActive}
      >
        {children}
      </GatsbyLink>
    )
  }

  // Use `gatsby-plugin-intl` Link (which prepends lang path)
  return (
    <InternalLink
      className={className}
      to={to}
      activeClassName="active"
      partiallyActive={isPartiallyActive}
    >
      {children}
    </InternalLink>
  )
}

export default Link
