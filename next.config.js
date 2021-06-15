const withPlugins = require("next-compose-plugins");
const withPwa = require("next-pwa");
module.exports = withPlugins([
  {
    images: {
      domains: ["storage.googleapis.com"],
    },
  },
  [
    withPwa,
    {
      pwa: {
        disable: process.env.NODE_ENV !== "production",
        dest: "public",
        register: true,
        sw: "/sw.js",
      },
    },
  ],
]);
