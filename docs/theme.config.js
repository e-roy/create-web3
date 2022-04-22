// theme.config.js
// import Gitlab from "@geist-ui/react-icons/gitlab";
export default {
  projectLink: "https://github.com/e-roy/create-web3", // GitHub link in the navbar
  // projectLinkIcon: <Gitlab />,
  // docsRepositoryBase: "https://github.com/e-roy/create-web3/blob/master", // base URL for the docs repository
  titleSuffix: " - Create-Web3",
  logo: (
    <>
      <span>create-web3</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Nextra: the next docs builder" />
      <meta name="og:title" content="Nextra: the next docs builder" />
    </>
  ),
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Eric Roupe`,
};
