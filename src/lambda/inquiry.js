const Analytics = require("analytics-node")
const crypto = require("crypto")

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  const { SEGMENT_API_KEY } = process.env
  const analytics = new Analytics(SEGMENT_API_KEY)

  const params = JSON.parse(event.body)
  const email = params.contactEmail

  const userId = crypto
    .createHash("md5")
    .update(email)
    .digest("hex")

  // TODO add property mappings to CRM
  analytics.identify({
    userId,
    traits: {
      name: params.nameOrProject,
      title: "VP of Derp",
      email,
      company: "Initech",
      phone: "570-690-4150",
      state: "California",
      rating: "Hot",
      city: "east greenwich",
      postalCode: "94115",
      country: "USA",
      street: "19123 forest lane",
      state: "RI",
    },
    integrations: {
      Salesforce: true,
    },
  })
  // TODO send Segment event?

  // TODO return error code based on Segment
  return {
    statusCode: 200,
    body: JSON.stringify({ ...params }),
  }
}
