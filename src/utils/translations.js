const defaultStrings = require("../intl/en.json")

const supportedLanguages = [`en`, `es`, `zh`]

// Splits key strings to access nested JSON objects
const resolve = (path, obj) => {
  return path.split(".").reduce((prev, curr) => {
    return prev ? prev[curr] : null
  }, obj)
}

// Returns the en.json value
const getDefaultMessage = key => {
  const defaultMessage = resolve(key, defaultStrings)
  if (defaultMessage === undefined) {
    console.error(
      `No key "${key}" in en.json. Cannot provide a default message.`
    )
  }
  return defaultMessage || ""
}

// Must export using ES5 to import in gatsby-node.js
module.exports.getDefaultMessage = getDefaultMessage
module.exports.supportedLanguages = supportedLanguages
