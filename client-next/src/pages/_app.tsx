import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { Roboto } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "@/styles/globals.scss";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
