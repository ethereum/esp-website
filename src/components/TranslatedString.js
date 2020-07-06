import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import { getDefaultMessage } from "../utils/translations"

// Wrapper on <FormattedMessage /> to always fallback to English
// Use this component for any user-facing string
// TODO replace use of <FormattedMessage /> throughout app
const TranslatedString = ({ id }) => (
  <FormattedMessage id={id} defaultMessage={getDefaultMessage(id)} />
)

export default TranslatedString
