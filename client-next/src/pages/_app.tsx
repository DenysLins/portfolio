import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { Roboto } from "@next/font/google";

import "@/styles/pages/globals.scss";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
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
      <ThemeProvider theme={theme}>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
