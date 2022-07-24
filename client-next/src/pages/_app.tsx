import Head from "next/head";
import { appWithTranslation } from "next-i18next";

import "@/styles/pages/globals.scss";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Denys Lins - Software Engineer | Developer </title>
      </Head>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);
