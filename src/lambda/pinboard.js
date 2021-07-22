const axios = require("axios")

exports.handler = async function(event, context) {
  try {
    const {
      AIRTABLE_API_KEY,
      AIRTABLE_BASE_ID,
      CONTEXT,
      LAMBDA_DOMAIN_WHITELIST,
    } = process.env

    if (CONTEXT !== "dev") {
      const host = event.headers.host
      const whitelist = JSON.parse(LAMBDA_DOMAIN_WHITELIST)
      if (!whitelist.includes(host)) {
        return {
          statusCode: 403,
        }
      }
    }

    const baseURL = !!process.env.NETLIFY_DEV
      ? `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/%5BTEST%5D%20Pinboard`
      : `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Pinboard`

    const resp = await axios.get(`${baseURL}?api_key=${AIRTABLE_API_KEY}`)

    if (resp.status < 200 || resp.status >= 300) {
      return { statusCode: resp.status, body: resp.statusText }
    }

    const data = await resp.data
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}
