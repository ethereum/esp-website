const supportedLanguages = [`en`]
const defaultLanguage = `en`

module.exports = {
  siteMetadata: {
    // `title` & `description` pulls from respective ${lang}.json files in seo.js
    title: `Ethereum Ecosystem Support Program`,
    description: `The Ethereum Ecosystem Support Program provides financial and non-financial support for projects working to accelerate the growth of Ethereum.`,
    url: "https://esp.ethereum.foundation",
    siteUrl: "https://esp.ethereum.foundation", // sitemap
    author: `@EF_ESP`,
    image:
      "https://user-images.githubusercontent.com/8097623/69177629-c137a400-0abc-11ea-9bcd-da3ba03d2688.png",
    defaultLanguage,
    supportedLanguages,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    // add support for markdown pages
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicons/114.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Work Sans\:100,300,400,500,600,700`],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-145235410-1",
      },
    },
    `gatsby-plugin-sitemap`,
    // i18n support
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: supportedLanguages,
        // language file path
        defaultLanguage,
        // redirect to `/en/` when connecting `/`
        redirect: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
