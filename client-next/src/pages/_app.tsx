import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import '@/styles/globals.scss';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Denys Lins - Software Engineer | Developer </title>
      </Head>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default appWithTranslation(MyApp);
