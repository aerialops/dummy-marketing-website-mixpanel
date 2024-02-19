import { Background } from "~/components/background";
import { Header } from "~/components/header";
import { LinkWithMixpanelTracking } from "~/components/link-with-mixpanel-tracking";

const PricingCard: React.FC<{
  title: string;
  description: string;
  price: string;
}> = ({ title, description, price }) => {
  return (
    <div className="flex flex-grow flex-col rounded-lg bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-2xl font-bold text-blue-700">{title}</h3>

      <div className="mb-4">
        <p>{description}</p>
      </div>

      <div className="flex-grow" />
      <h2 className="mb-4 text-3xl font-bold">{price}</h2>

      <LinkWithMixpanelTracking
        href="https://calendly.com/doug-aerial/website-demo-request"
        className="rounded-lg bg-blue-500 px-4 py-2 text-white"
        id={`schedule-demo-button-${title.toLowerCase()}`}
        description={`Schedule a ${title}-tier demo in pricing page`}
      >
        Schedule a demo
      </LinkWithMixpanelTracking>
    </div>
  );
};

export default function Page() {
  return (
    <Background>
      <Header />
      <header className="flex flex-grow flex-col items-center justify-center space-y-4 px-8 py-16 text-center">
        <div className="grid max-w-4xl grid-cols-3 gap-4">
          <PricingCard
            title="Launch"
            description="Early stage founders with less than $2M raised can get started using Aerial for free."
            price="Free!"
          />
          <PricingCard
            title="Grow"
            description="Congratulations! You have found a problem, a solution, and now you need to grow. Our growth plan offers expanded feature sets all at a fraction of your lawyers hourly rate."
            price="$250/month"
          />
          <PricingCard
            title="Scale"
            description="It’s time to expand, and we have your back with custom built solutions for your company."
            price="$495/month"
          />
        </div>
      </header>
    </Background>
  );
}
