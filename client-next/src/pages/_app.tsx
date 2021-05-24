import Head from "next/head";
import { appWithTranslation } from 'next-i18next'

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Denys Lins - Software Engineer | Developer </title>
      </Head>
      <Component {...pageProps} />

    </div>

  )
}

export default appWithTranslation(MyApp);
