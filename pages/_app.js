import "../styles/globals.css";
import "nextra-theme-docs/style.css";

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default App;
