import { grey, red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import '@/styles/globals.scss';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: grey[300] },
    error: { main: red[600] },
  },
});

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Denys Lins - Software Engineer | Developer </title>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3001826346569100"
          crossorigin="anonymous"
        ></script>
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
