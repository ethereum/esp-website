const axios = require("axios")

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" }
    }

    const { SEGMENT_API_KEY } = process.env
    const baseURL = `https://api.segment.io/v1/identify`

    let keyBuff = new Buffer(`${SEGMENT_API_KEY}:`)
    let auth = keyBuff.toString("base64")

    const params = JSON.parse(event.body)
    const email = params.contactEmail

    // Hack to ensure we create a unique lead every submission
    // By default, Segment merges lead data if the email exists:
    // https://segment.com/docs/connections/destinations/catalog/salesforce/
    const dedupedEmail = email.replace("@", `+${Date.now()}@`)

    const emailBuff = new Buffer(email)
    const userId = emailBuff.toString("base64")

    const instance = axios.create({
      headers: { Authorization: `Basic ${auth}` },
    })

    const resp = await instance.post(baseURL, {
      userId: userId,
      traits: {
        LastName: params.name, // Salesforce requires LastName field
        Email: dedupedEmail,
        Company: params.projectName, // Salesforce requires Company field
        City: params.city,
        Country: params.country,
        LeadSource: "Website Form",
        Status: "New",
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
        Project_Description: params.projectDescription,
        Challenges: params.challenges,
        Impact: params.impact,
      },
      integrations: {
        Salesforce: true,
        MailChimp: false, // TODO add opt-in for these forms
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
