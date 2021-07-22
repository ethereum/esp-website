const axios = require("axios")

exports.handler = async function(event, context) {
  try {
    const { CONTEXT, SEGMENT_API_KEY, LAMBDA_DOMAIN_WHITELIST } = process.env

    if (CONTEXT !== "dev") {
      const host = event.headers.host
      const whitelist = JSON.parse(LAMBDA_DOMAIN_WHITELIST)
      if (!whitelist.includes(host)) {
        return {
          statusCode: 403,
        }
      }
    }

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" }
    }

    const baseURL = `https://api.segment.io/v1/identify`

    let keyBuff = new Buffer(`${SEGMENT_API_KEY}:`)
    let auth = keyBuff.toString("base64")

    const email = JSON.parse(event.body)
    const emailBuff = new Buffer(email)
    const userId = emailBuff.toString("base64")

    const instance = axios.create({
      headers: { Authorization: `Basic ${auth}` },
    })

    const resp = await instance.post(baseURL, {
      userId: userId,
      traits: {
        email,
        newsletter: true, // Custom audience field
      },
      integrations: {
        Salesforce: false,
      },
    })

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
