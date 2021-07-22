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

    const baseURL = `https://api.segment.io/v1/track`

    let keyBuff = new Buffer(`${SEGMENT_API_KEY}:`)
    let auth = keyBuff.toString("base64")

    const params = JSON.parse(event.body)

    const {
      ethOrFiat,
      beneficiaryName,
      contactEmail,
      beneficiaryAddress,
      fiatCurrencySymbol,
      bankName,
      bankAddress,
      bankAccountNumber,
      bankRoutingNumber,
      bankSWIFT,
      ethOrDai,
      ethAddress,
      daiAddress,
      notes,
      granteeSecurityID,
    } = params

    // Wipe out any old values
    const properties =
      ethOrFiat === "fiat"
        ? {
            beneficiaryName,
            contactEmail,
            beneficiaryAddress,
            fiatCurrencySymbol,
            bankName,
            bankAddress,
            bankAccountNumber,
            bankRoutingNumber,
            bankSWIFT,
            ethAddress: "",
            daiAddress: "",
            notes,
          }
        : {
            beneficiaryName,
            contactEmail,
            beneficiaryAddress: "",
            fiatCurrencySymbol: "",
            bankName: "",
            bankAddress: "",
            bankAccountNumber: "",
            bankRoutingNumber: "",
            bankSWIFT: "",
            ethAddress: ethOrDai === "eth" ? ethAddress.trim() : "", // ensure only 1 has a value
            daiAddress: ethOrDai === "dai" ? daiAddress.trim() : "", // ensure only 1 has a value
            notes,
          }

    const instance = axios.create({
      headers: { Authorization: `Basic ${auth}` },
    })

    const resp = await instance.post(baseURL, {
      userId: granteeSecurityID.trim(),
      event: "Grantee form submitted",
      properties,
      integrations: {
        Salesforce: true,
        MailChimp: false,
      },
    })

    if (resp.status < 200 || resp.status >= 300) {
      return {
        statusCode: resp.status,
        body: resp.statusText,
      }
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
