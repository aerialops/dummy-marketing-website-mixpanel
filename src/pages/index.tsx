import { Background } from "~/components/background";
import { Header } from "~/components/header";
import { LinkWithMixpanelTracking } from "~/components/link-with-mixpanel-tracking";

export default function Page() {
  return (
    <Background>
      <Header />
      <header className="flex flex-grow flex-col items-center justify-center space-y-4 px-8 py-16 text-center">
        <h1 className="text-6xl font-bold leading-tight">
          Custom built to scale your company
        </h1>
        <p className="text-xl text-gray-600">
          Ensure you’re investor ready with our corporate information and legal
          document infrastructure. (retrigger deploys)
        </p>
        <LinkWithMixpanelTracking
          href="https://calendly.com/doug-aerial/website-demo-request"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          id="schedule-demo-button"
          description="Schedule a demo button in main page"
        >
          Schedule a demo
        </LinkWithMixpanelTracking>
      </header>
    </Background>
  );
}
