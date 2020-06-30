const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCss = require("@zeit/next-css");

module.exports = withPlugins(
  [
    [withSass, { /* plugin config here ... */ }],
    [withCss,  { /* plugin config here ... */ }],
  ],
  {
    /* global config here ... */
  },
);