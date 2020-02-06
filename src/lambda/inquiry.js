const Analytics = require("analytics-node")
const crypto = require("crypto")

exports.handler = async function(event, context) {
  try {
    console.log("*****************************")
    console.log({ event })
    console.log("*****************************")
    console.log({ context })
    console.log("*****************************")
    console.log({ node: process.version })
    console.log("*****************************")
    console.log({ process })
    console.log("*****************************")

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" }
    }

    const { SEGMENT_API_KEY } = process.env
    const analytics = new Analytics(SEGMENT_API_KEY, { flushAt: 1 })

    const params = JSON.parse(event.body)
    const email = params.contactEmail

    const userId = crypto
      .createHash("md5")
      .update(email)
      .digest("hex")

    console.log("*****************************")
    console.log({ params })
    console.log("*****************************")
    console.log({ email })
    console.log("*****************************")
    console.log({ userId })
    console.log("*****************************")

    // Do not change these trait object keys
    // They map to specific CRM fields
    analytics.identify({
      userId,
      traits: {
        LastName: params.name, // Salesforce requires LastName field
        Email: email,
        Company: params.projectName, // Salesforce requires Company field
        City: params.city,
        Country: params.country,
        LeadSource: "Website Form",
        // Custom fields
        Team_Profile: params.teamProfile,
        Previous_Work: params.previousWork,
        Referral_Source: params.referralSource,
        Referrals: params.referralName,
        Type_of_Inquiry: params.challenges
          ? "Project"
          : "Exploring Possibilities",
        // Explore custom fields
        Area_of_Expertise: params.areaOfExpertise,
        Why_Ethereum: params.whyEthereum,
        Recent_Projects_or_Developments: params.recentProjectsOrDevelopments,
        Questions: params.questions,
        // Project custom fields
        Description: params.projectDescription,
        Challenges: params.challenges,
        Impact: params.impact,
        Key: SEGMENT_API_KEY.length,
      },
      integrations: {
        Salesforce: true,
      },
    })

    // TODO return error code based on Segment?
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...params,
        key: SEGMENT_API_KEY.length,
        host: analytics.host,
        userId,
      }),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}
