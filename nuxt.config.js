const pkg = require('./package')

module.exports = {
  mode: 'universal',

  router: {
    base: '/'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', sizes: '192x192', href: '/logo.png' },
      { rel: 'manifest', href: '/manifest.json' },
      /*{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }*/
    ],
    script: [
      /*{ src: 'https://cdn.jsdelivr.net/npm/rete@1.0.0-alpha.8/build/rete.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/alight@0.14.1/alight.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/rete-alight-render-plugin@0.1.5/build/alight-render-plugin.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/rete-connection-plugin@0.1.2/build/connection-plugin.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/rete-context-menu-plugin@0.1.4/build/context-menu-plugin.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/rete-area-plugin@0.1.1/build/area-plugin.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/rete-module-plugin@0.1.3/build/module-plugin.min.js'},
      { src: 'https://cdn.jsdelivr.net/npm/rete-profiler-plugin@0.1.4/build/profiler-plugin.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js'}*/
      { src: '/js/rete/rete.min.js' },
      { src: '/js/rete/alight.min.js' },
      { src: '/js/rete/alight-render-plugin.min.js' },
      { src: '/js/rete/connection-plugin.min.js' },
      { src: '/js/rete/context-menu-plugin.min.js' },
      { src: '/js/rete/area-plugin.min.js' },
      { src: '/js/rete/module-plugin.min.js'},
      { src: '/js/rete/profiler-plugin.min.js'},
      { src: '/js/DragDropTouch.js'},
//      { src: '/js/rete/vue-render-plugin.min.js'},
      { src: '/js/socket.io.js'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome'
  ],
  env: {
   WS_URL: 'https://'+process.env.HOST+':'+process.env.PORT || 'https://localhost:3000'
 },
  /*
  ** Axios module configuration
  */
  axios: {
    https: true
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: ['~/assets/js/app.js'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
