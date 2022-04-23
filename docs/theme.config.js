export default {
  github: "https://github.com/e-roy/create-web3",
  docsRepositoryBase: "https://github.com/e-roy/create-web3/blob/master",
  titleSuffix: " – Create Web3",
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">Create-Web3</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        A boilerplate for web3 projects
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta
        name="description"
        content="Create-Web3: A boilerplate for web3 projects"
      />
      <meta
        name="og:description"
        content="Create-Web3: A boilerplate for web3 projects"
      />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:image" content="https://nextra.vercel.app/og.png" /> */}
      <meta name="twitter:site:domain" content="nextra.vercel.app" />
      {/* <meta name="twitter:url" content="https://nextra.vercel.app" /> */}
      <meta
        name="og:title"
        content="Create-Web3: A boilerplate for web3 projects"
      />
      {/* <meta name="og:image" content="https://nextra.vercel.app/og.png" /> */}
      <meta name="apple-mobile-web-app-title" content="Create-Web3" />
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: "",
  footerText: <>MIT {new Date().getFullYear()} © Eric Roupe</>,
  unstable_faviconGlyph: "🧱",
};
