import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { Exo } from "next/font/google";
import "~/styles/globals.css";
import React from "react";

import mixpanel from "mixpanel-browser";
import { env } from "~/env";
import { useRouter } from "next/router";

const exoFont = Exo({ subsets: ["latin"] });

const useInitMixpanel = () => {
  React.useEffect(() => {
    mixpanel.init(env.NEXT_PUBLIC_MIXPANEL_PROJECT_KEY, {
      debug: true,
      track_pageview: false,
      cookie_domain: ".aerialops.io",
    });
  }, []);
};

const useTrackPageView = () => {
  const router = useRouter();

  React.useEffect(() => {
    const trackPageChange = (to: string) =>
      mixpanel.track_pageview({
        from: router.asPath,
        to,
      });

    router.events.on("hashChangeStart", trackPageChange);
    router.events.on("routeChangeStart", trackPageChange);

    return () => {
      router.events.off("hashChangeStart", trackPageChange);
      router.events.off("routeChangeStart", trackPageChange);
    };
  }, [router.asPath, router.events]);
};

const MyApp: AppType = ({ Component, pageProps }) => {
  useInitMixpanel();
  useTrackPageView();

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
