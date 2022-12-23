import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Roboto } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import "@/styles/globals.scss";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
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
