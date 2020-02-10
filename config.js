const config = {
  gatsby: {
    pathPrefix: "/docs/",
    siteUrl: "https://leunardo.dev/docs",
    gaTrackingId: null
  },
  header: {
    logo:
      "https://leunardo.dev/docs/assets/img/icon.png",
    logoLink: "https://leunardo.dev/docs",
    title: "GoStack Documentation",
    githubUrl: "https://github.com/LeuAlmeida/documentation",
    helpUrl: "https://github.com/LeuAlmeida/documentation/issues",
    tweetText: "",
    links: [{ text: "", link: "" }],
    search: {
      enabled: false,
      indexName: "",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY
    }
  },
  sidebar: {
    forcedNavOrder: ["/utils", "/introduction", "/nodejs", "/reactjs", "/react-native", "/flux", "/websocket", "/tests"],
    collapsedNav: ["/utils", "/nodejs", "/reactjs", "/react-native", "/flux", "/websocket", "/tests"],
    links: [
      // { text: "Léu Almeida", link: "https://leunardo.dev" },
      // { text: "Thiago Tamosauskas", link: "https://github.com/TTamosauskas" }
    ],
    frontline: false,
    ignoreIndex: true
  },
  siteMetadata: {
    title: "GoStack Documentation",
    description: "Documentation built with mdx. Powering leunardo.dev ",
    ogImage: null,
    docsLocation:
      "https://github.com/LeuAlmeida/documentation/tree/master/content",
    favicon: "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg"
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: "Gatsby Gitbook Starter",
      short_name: "GitbookStarter",
      start_url: "/",
      background_color: "#6b37bf",
      theme_color: "#6b37bf",
      display: "standalone",
      crossOrigin: "use-credentials",
      icons: [
        {
          src: "src/pwa-512.png",
          sizes: `512x512`,
          type: `image/png`
        }
      ]
    }
  }
};

module.exports = config;
