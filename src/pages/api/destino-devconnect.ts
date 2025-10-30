import jsforce from 'jsforce';
import { NextApiRequest, NextApiResponse } from 'next';

import { sanitizeFields, verifyCaptcha } from '../../middlewares';
import { DestinoDevconnectSchema } from '../../components/forms/schemas/DestinoDevconnect';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(resolve => {
    const { SF_PROD_LOGIN_URL, SF_PROD_USERNAME, SF_PROD_PASSWORD, SF_PROD_SECURITY_TOKEN } =
      process.env;

    // validate fields against the schema
    const result = DestinoDevconnectSchema.safeParse(req.body);
    if (!result.success) {
      const formatted = result.error.format();
      console.error(formatted);

      res.status(500).end();
      return resolve();
    }

    const conn = new jsforce.Connection({
      loginUrl: SF_PROD_LOGIN_URL
    });

    conn.login(SF_PROD_USERNAME!, `${SF_PROD_PASSWORD}${SF_PROD_SECURITY_TOKEN}`, err => {
      if (err) {
        console.error(err);
        res.status(500).end();
        return resolve();
      }

      // Company is a required field in SF, we're using the Full Name as default value if no company provided
      const company = result.data.company
        ? result.data.company
        : `${result.data.firstName} ${result.data.lastName}`;

      // SF mapping
      const baseApplication = {
        FirstName: result.data.firstName,
        LastName: result.data.lastName,
        Email: result.data.email,
        Company: company,
        Team_Profile__c: result.data.teamProfile,
        Previous_Work__c: result.data.previousWork,
        Twitter__c: result.data.twitter,
        Alternative_Contact__c: result.data.alternativeContact,
        npsp__CompanyCountry__c: result.data.country,
        Time_Zone__c: result.data.timezone,
        Category__c: result.data.category,
        Proposed_Timeline__c: result.data.proposedTimeline,
        Referral_Source__c: result.data.referralSource,
        Referrals__c: result.data.referrals,
        Other_Projects__c: result.data.futureEvents,
        Additional_Information__c: result.data.additionalInfo,
        Repeat_Applicant__c: result.data.repeatApplicant,
        Can_the_EF_reach_out__c: result.data.canTheEFReachOut,
        // Ignoring this field as requested by the team since it was not in the SF schema
        // Applying_as_a__c: result.data.applyingAs,
        Proactive_Community_Grants_Round__c: 'Destino Devconnect',
        LeadSource: 'Webform',
        RecordTypeId: process.env.SF_RECORD_TYPE_SPONSORSHIPS!
      };

      let application = {};

      if (result.data.category === 'Community Initiative') {
        application = {
          ...baseApplication,
          Project_Name__c: result.data.projectName,
          Project_Description__c: result.data.projectDescription,
          Github_Link__c: result.data.projectRepoLink,
          Problem_Being_Solved__c: result.data.problemBeingSolved,
          Impact__c: result.data.impact,
          CurrencyIsoCode: result.data.fiatCurrency,
          Requested_Amount__c: result.data.requestedAmount,
          Support_Request_Type__c: result.data.requestedSupport.join(';'),
          Nonfinancial_Ticket_Request__c: result.data.ticketRequest,
          Nonfinancial_Voucher_Request__c: result.data.voucherRequest,
          Additional_support_requests__c: result.data.additionalSupportRequests
        };
      }

      if (result.data.category === 'Non-Financial Support') {
        const eventDate = result.data.eventDate === '' ? undefined : result.data.eventDate;

        application = {
          ...baseApplication,
          Project_Name__c: result.data.eventName,
          Sponsorship_Date__c: eventDate,
          Sponsorship_Link__c: result.data.eventLink,
          Sponsorship_Details__c: result.data.eventDescription,
          Sponsorship_Topics__c: result.data.eventTopics,
          Type_of_Event__c: result.data.typeOfEvent,
          In_Person__c: result.data.inPerson,
          Event_Location__c: result.data.eventLocation,
          Estimated_Number_of_Attendees__c: result.data.estimatedAttendees,
          Target_Audience__c: result.data.targetAudience,
          Confirmed_Speakers__c: result.data.confirmedSpeakers,
          Confirmed_Sponsors__c: result.data.confirmedSponsors,
          Additional_support_requests__c: result.data.nonFinancialSupportRequest
        };
      }

      // Single record creation
      conn.sobject('Lead').create(application, (err, ret) => {
        if (err || !ret.success) {
          console.error(err);
          res.status(400).json({ status: 'fail' });
          return resolve();
        }

        console.log(`Destino Devconnect Lead with ID: ${ret.id} has been created!`);

        res.status(200).json({ status: 'ok' });
        return resolve();
      });
    });
  });
}

export default sanitizeFields(verifyCaptcha(handler));
