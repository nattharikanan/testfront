import colors from "vuetify/es5/util/colors";
import dotenv from "dotenv";
dotenv.config();

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios", //-- add plugins axios
    { src: "~/plugins/vue-thailand-address-autocomplete", ssr: false }
  ],
  proxy: {
    "/api": process.env.NUXT_ENV_API, //-- ตั้งค่า map proxy url api server //http://9e5d3e89.ngrok.io/ //"http://127.0.0.1:7000"
    ws: true
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify", ["@nuxtjs/dotenv", { systemvars: true }]],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/proxy",
    "@nuxtjs/auth",
    "@nuxtjs/axios"
  ],
  auth: {
    redirect: {
      login: "/users/login"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${process.env.NUXT_ENV_API}/api/users/login`,
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/sessions", method: "delete" },
          user: {
            url: `${process.env.NUXT_ENV_API}/api/users/me`,
            method: "get",
            propertyName: "userData"
          }
        },
        tokenRequired: true,
        tokenType: "bearer",
        globalToken: true,
        autoFetchUser: true
      }
    }
  },
  bootstrapVue: {
    icons: true // Install the IconsPlugin (in addition to BootStrapVue plugin
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: [
      "vuetify",
      "vue-axios" //-- add vendor vue-axios
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
