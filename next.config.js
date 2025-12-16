/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1504, 1920, 2560]
  },
  async redirects() {
    return [
      // Grantee Finance (deprecated)
      { source: '/applicants/grantee-finance', destination: '/', permanent: true },
      { source: '/applicants/grantee-finance/thank-you', destination: '/', permanent: true },
      // Academic Grants - keep 2022, 2023, 2024 redirects but keep main page
      { source: '/academic-grants-2022', destination: '/', permanent: true },
      { source: '/academic-grants-2023', destination: '/', permanent: true },
      { source: '/academic-grants-2024', destination: '/', permanent: true },
      // Academic Grants apply/thank-you pages redirect to main page (form removed)
      { source: '/academic-grants/apply', destination: '/academic-grants', permanent: true },
      { source: '/academic-grants/thank-you', destination: '/academic-grants', permanent: true },
      // Devcon Grants (deprecated)
      { source: '/devcon-grants', destination: '/', permanent: true },
      { source: '/devcon-grants/apply', destination: '/', permanent: true },
      { source: '/devcon-grants/thank-you', destination: '/', permanent: true },
      // Ecodev Grants (deprecated)
      { source: '/ecodev-grants', destination: '/', permanent: true },
      { source: '/ecodev-grants/apply', destination: '/', permanent: true },
      { source: '/ecodev-grants/thank-you', destination: '/', permanent: true },
      // EPF Application (deprecated)
      { source: '/epf-application', destination: '/', permanent: true },
      { source: '/epf-application/apply', destination: '/', permanent: true },
      { source: '/epf-application/thank-you', destination: '/', permanent: true },
      // PSE Grants (deprecated)
      { source: '/pse-grants', destination: '/', permanent: true },
      { source: '/pse-grants/apply', destination: '/', permanent: true },
      { source: '/pse-grants/thank-you', destination: '/', permanent: true },
      // PSE Sponsorships (deprecated)
      { source: '/pse-sponsorships', destination: '/', permanent: true },
      { source: '/pse-sponsorships/apply', destination: '/', permanent: true },
      { source: '/pse-sponsorships/thank-you', destination: '/', permanent: true },
      // 10 Year Anniversary (deprecated)
      { source: '/form-10yoe', destination: '/', permanent: true },
      { source: '/form-10yoe/apply', destination: '/', permanent: true },
      { source: '/form-10yoe/thank-you', destination: '/', permanent: true },
      { source: '/10-year-anniversary', destination: '/', permanent: true },
      // Other grant pages (deprecated)
      { source: '/account-abstraction-grants', destination: '/', permanent: true },
      { source: '/data-challenge-4844', destination: '/', permanent: true },
      { source: '/data-collection-grants', destination: '/', permanent: true },
      { source: '/layer-2-grants', destination: '/', permanent: true },
      { source: '/merge-data-challenge', destination: '/', permanent: true },
      { source: '/pectra-pgr', destination: '/', permanent: true },
      { source: '/run-a-node-grants', destination: '/', permanent: true },
      { source: '/semaphore-grants', destination: '/', permanent: true },
      { source: '/zk-grants', destination: '/', permanent: true }
    ];
  }
};

module.exports = nextConfig;
