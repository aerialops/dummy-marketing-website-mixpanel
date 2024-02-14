import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { Exo } from "next/font/google";
import "~/styles/globals.css";

const exoFont = Exo({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Aerial</title>
      </Head>
      {/* Quick and ugly way of setting the Exo font everywhere, and not having overflow in the app*/}
      <style jsx global>{`
        html {
          font-family: ${exoFont.style.fontFamily};
        }

        body {
          overflow: hidden;
        }
      `}</style>
      <Component {...pageProps} />;
    </>
  );
};

export default MyApp;
