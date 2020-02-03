module.exports = {
  siteMetadata: {
    title: `Toqeer Iqbal`,
    description: `I am Toqeer, MERN Stack Developer from Pakistan. Currently Working with Two Big Travel Brands TheBrokeBackPacker & OneWeirdGlobe. I have over 4 years of experience in Web Development.`,
    author: `@toqeer`,
    siteUrl: "https://toqeeriqbal.com/",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    [`gatsby-plugin-antd`],
    [`gatsby-plugin-sitemap`],
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
