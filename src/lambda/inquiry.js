const axios = require("axios")
const { GoogleSpreadsheet } = require("google-spreadsheet")

exports.handler = async function(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" }
    }

    const { SEGMENT_API_KEY } = process.env
    const baseURL = `https://api.segment.io/v1/identify`

    let keyBuff = new Buffer.from(`${SEGMENT_API_KEY}:`)
    let auth = keyBuff.toString("base64")

    const params = JSON.parse(event.body)
    const email = params.contactEmail.trim()

    // Hack to ensure we create a unique lead every submission
    // By default, Segment merges lead data if the email exists:
    // https://segment.com/docs/connections/destinations/catalog/salesforce/
    const dedupedEmail = email.replace("@", `+${Date.now()}@`)

    const emailBuff = new Buffer.from(email)
    const userId = emailBuff.toString("base64")

    const instance = axios.create({
      headers: { Authorization: `Basic ${auth}` },
    })

    // Send to Mailchimp (if subscribed)
    if (!!params.newsletter) {
      const mailchimpResp = await instance.post(baseURL, {
        userId: userId,
        traits: {
          email,
          name: params.name,
          newsletter: true,
        },
        integrations: {
          Salesforce: false,
        },
      })

      if (mailchimpResp.status < 200 || mailchimpResp.status >= 300) {
        return {
          statusCode: mailchimpResp.status,
          body: mailchimpResp.statusText,
        }
      }
    }

    const isProjectInquiry = params.exploreOrProject === "project"

    // 1. Send to Mailchimp (if subscribed)
    // 2. Send to Salesforce
    // 3. Send to Google Sheets (if LGP)
    if (isProjectInquiry) {
      const salesforceResp = await instance.post(baseURL, {
        userId: userId,
        traits: {
          LastName: params.name, // Salesforce requires LastName field
          Email: dedupedEmail,
          Company: params.projectName || params.name, // Salesforce requires Company field
          City: params.city,
          Country: params.country,
          LeadSource: "Website Form",
          Status: "New",
          // Custom fields
          Team_Profile: params.teamProfile,
          Previous_Work: params.previousWork,
          Referral_Source: params.referralSource,
          Referrals: params.referralName,
          Type_of_Inquiry: "Project",
          Project_Description: params.projectDescription,
          Challenges: params.challenges,
          Impact: params.impact,
          // LGP custom fields
          Local_Grants_Wave: params.wave,
          Project_Category: params.projectCategory,
          Stage_of_Project: params.projectStage,
          Problem_Being_Solved: params.problemBeingSolved,
          Individual_or_Team: params.individualOrTeam,
          Alternative_Contact: params.contactAlternative,
          Referral_Source_if_Other: params.referralSourceIfOther,
        },
        integrations: {
          Salesforce: true,
          MailChimp: false,
        },
      })

      // Send to Google Sheets (if LGP)
      if (params.wave) {
        const creds = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID)
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key,
        })
        await doc.loadInfo()
        const sheet = doc.sheetsById["1921832072"]
        await sheet.addRow(params)
      }

      if (salesforceResp.status < 200 || salesforceResp.status >= 300) {
        return {
          statusCode: salesforceResp.status,
          body: salesforceResp.statusText,
        }
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify({ data: salesforceResp.data }),
        }
      }
    } else {
      // Send general inquiry to Mailchimp
      const mailchimpResp = await instance.post(baseURL, {
        userId: userId,
        traits: {
          email,
          name: params.name,
          inquiry: params.inquiry,
          type: params.inquiryType,
          newsletter: !!params.newsletter,
          project: params.projectName,
        },
        integrations: {
          Salesforce: false,
        },
      })
      return {
        statusCode: mailchimpResp.status,
        body: mailchimpResp.statusText,
      }
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}
