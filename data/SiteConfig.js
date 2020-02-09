const config = {
  siteTitle: "Toqeer Iqbal",
  siteTitleShort: "Toqeer Iqbal",
  siteTitleAlt: "Toqeer Iqbal",
  siteLogo: "/logos/logo-1024.png",
  siteUrl: "https://www.toqeeriqbal.com",
  repo: "https://github.com/mtoqeer/personal-porfolio",
  pathPrefix: "",
  dateFromFormat: "YYYY-MM-DD",
  dateFormat: "MMMM Do, YYYY",
  siteDescription:
    "Toqeer Iqbal is a full stack website developer specializing in modern JavaScript.",
  siteRss: "/rss.xml",
  googleAnalyticsID: "",
  postDefaultCategoryID: "Tech",
  newsletter: "https://toqeer.substack.com",
  newsletterEmbed: "https://toqeer.substack.com/embed",
  userName: "Toqeer",
  userEmail: "toqeer@gmail.com",
  userTwitter: "",
  menuLinks: [
    {
      name: "About me",
      link: "/me/"
    },
    {
      name: "Articles",
      link: "/blog/"
    },
    {
      name: "Contact",
      link: "/contact/"
    }
  ],
  themeColor: "#3F80FF", // Used for setting manifest and progress theme colors.
  backgroundColor: "#ffffff"
};

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
