const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_staticImage: true,
  unstable_contentDump: true,
  unstable_flexsearch: true,
  unstable_staticImage: true,
});
module.exports = withNextra();
