const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://docs.leunardo.dev',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: 'https://leunardo.dev/docs/icon.png',
    logoLink: 'https://docs.leunardo.dev',
    title:
      "<a href='https://docs.leunardo.dev'><span>Stack.mdx Documentation</span></a>",
    githubUrl: 'https://github.com/LeuAlmeida/documentation',
    helpUrl: 'https://github.com/LeuAlmeida/documentation/issues',
    tweetText: '',
    social:
    "",
    links: [{ text: '', link: '' }],
    search: {
      enabled: true,
      indexName: 'dev_DOCS',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/utils',
      '/aws',
      '/grpc',
      '/javascript',
      '/typescript',
      '/nodejs',
      '/reactjs',
      '/react-native',
      '/golang',
      '/flux',
      '/websocket',
      '/tests',
      '/elixir',
    ],
    collapsedNav: [
      '/utils',
      '/aws',
      '/grpc',
      '/javascript',
      '/typescript',
      '/nodejs',
      '/reactjs',
      '/react-native',
      '/golang',
      '/flux',
      '/websocket',
      '/tests',
      '/elixir',
    ],
    links: [{ text: 'Léu Almeida', link: 'https://leunardo.dev' }],
    frontline: false,
    ignoreIndex: true,
    title:
      "<a href='https://docs.leunardo.dev'>stack</a><div class='greenCircle'></div><a href='https://leunardo.dev'>mdx</a>",
  },
  siteMetadata: {
    title: 'Stack.mdx Documentation',
    description: 'Documentation built with mdx. Powering leunardo.dev ',
    ogImage: 'https://leunardo.dev/docs/site-preview.jpeg',
    docsLocation: 'https://github.com/LeuAlmeida/documentation/tree/master/content',
    favicon: 'https://leunardo.dev/docs/icon.png',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Stack.mdx Documentation',
      short_name: 'Stackmdx',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/icon.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
