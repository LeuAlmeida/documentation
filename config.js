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
      // "",
    githubUrl: 'https://github.com/LeuAlmeida/documentation',
    helpUrl: 'https://github.com/LeuAlmeida/documentation/issues',
    tweetText: '',
    social:
    // `<li>
		//     <a href="https://twitter.com/hasurahq" target="_blank" rel="noopener">
		//       <div class="twitterBtn">
		//         <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg' alt={'Discord'}/>
		//       </div>
		//     </a>
		//   </li>
		// 	<li>
		//     <a href="https://discordapp.com/invite/hasura" target="_blank" rel="noopener">
		//       <div class="discordBtn">
		//         <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-block.svg' alt={'Discord'}/>
		//       </div>
		//     </a>
    //   </li>`,
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
      '/introduction',
      '/javascript',
      '/typescript',
      '/nodejs',
      '/reactjs',
      '/react-native',
      '/flux',
      '/websocket',
      '/tests',
    ],
    collapsedNav: [
      '/utils',
      '/aws',
      '/introduction',
      '/javascript',
      '/typescript',
      '/nodejs',
      '/reactjs',
      '/react-native',
      '/flux',
      '/websocket',
      '/tests',
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
