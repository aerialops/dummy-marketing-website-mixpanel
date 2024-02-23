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
      // Client side navigation will not be automatically tracked, so we need to do it manually
      track_pageview: false,
      // Share the same cookie across subdomains so we can properly track the user
      // in the marketing site and the app
      cookie_domain: ".aerialops.io",
      cross_subdomain_cookie: true,
    });
  }, []);
};

/** Create an object with containing all query parameter key value pairs from a
 * given URL, to be used in analytics for easier report creation. This way, we
 * don't have to parse the strings when creating the report. */
export const mkQueryParamsObject = (
  pathOrUrl: string,
  keyPrefix: string,
): Record<string, string> => {
  const { searchParams } = new URL(pathOrUrl, window.location.origin);
  const obj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    obj[`${keyPrefix}_${key}`] = value;
  });
  return obj;
};

const mkPathFromUrl = (pathOrUrl: string) =>
  new URL(pathOrUrl, window.location.origin).pathname;

const useTrackPageView = () => {
  const router = useRouter();

  React.useEffect(() => {
    const trackPageChange = (to: string) =>
      mixpanel.track_pageview({
        from: router.asPath,
        to,
        to_path: mkPathFromUrl(to),
        ...mkQueryParamsObject(to, "to_qp"),
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
