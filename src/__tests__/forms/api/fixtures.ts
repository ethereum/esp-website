/**
 * Test fixtures for form API tests
 * These fixtures provide valid data that meets all schema validation requirements
 */

// Helper to generate text of specific length
export const generateText = (length: number, prefix = 'Text'): string => {
  const repeated = `${prefix} content. `.repeat(Math.ceil(length / (prefix.length + 10)));
  return repeated.slice(0, length);
};

// Valid base contact information
export const validContactInfo = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  company: 'Test Company',
  profileType: 'Individual' as const,
  country: 'US',
  timezone: 'America/New_York'
};

// Valid project overview (for forms WITHOUT project details)
export const validProjectOverview = {
  projectName: 'Test Project',
  projectSummary: generateText(500, 'Project summary'),
  projectRepo: '', // Empty string is valid
  domain: 'Layer 2' as const,
  output: 'Research' as const,
  budgetRequest: 50000,
  currency: 'USD'
};

// Valid project details (for Wishlist and DirectGrant forms)
export const validProjectDetails = {
  projectStructure: generateText(500, 'Project structure'),
  sustainabilityPlan: generateText(500, 'Sustainability plan'),
  funding: generateText(50, 'Funding'), // CUSTOM_MIN_TEXT_AREA_LENGTH = 50
  problemBeingSolved: generateText(500, 'Problem being solved'),
  measuredImpact: generateText(50, 'Measured impact'), // CUSTOM_MIN_TEXT_AREA_LENGTH = 50
  successMetrics: generateText(500, 'Success metrics'),
  ecosystemFit: generateText(500, 'Ecosystem fit'),
  communityFeedback: generateText(50, 'Community feedback'), // CUSTOM_MIN_TEXT_AREA_LENGTH = 50
  openSourceLicense: 'MIT'
};

// Valid additional details
export const validAdditionalDetails = {
  repeatApplicant: false,
  referral: 'Test Referral',
  opportunityOutreachConsent: true,
  captchaToken: 'mock-captcha-token'
};

// Valid applicant profile (for Wishlist and DirectGrant)
export const validApplicantProfile = generateText(
  500,
  'Applicant profile with detailed background information about experience and qualifications'
);

// Valid file upload mock
export const validFileUpload = {
  filepath: '/tmp/test.pdf',
  originalFilename: 'proposal.pdf',
  mimetype: 'application/pdf',
  size: 1000000 // 1MB
};

/**
 * Complete valid RFP form data
 */
export const validRFPData = {
  selectedRFPId: 'rfp-123',
  ...validContactInfo,
  ...validProjectOverview,
  ...validAdditionalDetails
};

/**
 * Complete valid Wishlist form data
 */
export const validWishlistData = {
  selectedWishlistId: 'wishlist-123',
  ...validContactInfo,
  applicantProfile: validApplicantProfile,
  ...validProjectOverview,
  ...validProjectDetails,
  ...validAdditionalDetails
};

/**
 * Complete valid DirectGrant form data
 */
export const validDirectGrantData = {
  ...validContactInfo,
  applicantProfile: validApplicantProfile,
  ...validProjectOverview,
  ...validProjectDetails,
  ...validAdditionalDetails
};

/**
 * Complete valid OfficeHours Advice request data
 */
export const validOfficeHoursAdviceData = {
  firstName: 'Sarah',
  lastName: 'Connor',
  email: 'sarah@example.com',
  company: 'Tech Corp',
  profileType: 'Individual' as const,
  country: 'US',
  timezone: 'America/Los_Angeles',
  officeHoursRequest: 'Advice' as const,
  officeHoursReason: generateText(100, 'Office hours reason'),
  repeatApplicant: false,
  opportunityOutreachConsent: true,
  captchaToken: 'mock-token'
};

/**
 * Complete valid OfficeHours Project Feedback request data
 */
export const validOfficeHoursProjectFeedbackData = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john@example.com',
  company: 'Dev Company',
  profileType: 'Team' as const,
  country: 'CA',
  timezone: 'America/Toronto',
  officeHoursRequest: 'Project Feedback' as const,
  officeHoursReason: generateText(100, 'Office hours reason'),
  projectName: 'Awesome L2 Project',
  projectSummary: generateText(100, 'Project summary'),
  projectRepo: 'https://github.com/awesome/l2',
  domain: 'Layer 2' as const,
  additionalInfo: 'Additional context about the project.',
  repeatApplicant: false,
  opportunityOutreachConsent: true,
  captchaToken: 'mock-token'
};
