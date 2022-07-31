// import { useTheme } from "next-themes";

const github = "https://github.com/";

export default {
  github,
  projectLink: github,
  titleSuffix: "⚓️ ankr",
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">ankr docs</span>
      <span className="text-gray-600 dark:text-gray-200 font-normal hidden md:inline">
        the web3 infrastructure company
      </span>
    </>
  ),
  head: ({ meta, title }) => {
    const description =
      meta.description ||
      "create-web3 is a boilplate for creating and deploying dapps and smart contracts.  non opinionated, user choice of frameworks, and quick to setup.";
    const title_ =
      title && !title.startsWith("ankr")
        ? title + " ⚓️ ankr"
        : "ankr ⚓️ the web3 infrastructure company";

    return (
      <>
        {/* General */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <title>{title_}</title>

        {/* SEO */}
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="og:title" content={title_} />
        {/* <meta name="og:image" content="https://.png" /> */}
        <meta name="twitter:card" content="summary" />

        <meta name="apple-mobile-web-app-title" content="create-web3" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </>
    );
  },
  search: true,
  prevLinks: true,
  nextLinks: true,
  nextThemes: {
    defaultTheme: "dark",
  },
  footer: true,
  footerEditLink: "",
  footerText: <>MIT {new Date().getFullYear()} © ankr</>,
  unstable_faviconGlyph: "🧱",
  unstable_flexsearch: true,
};
