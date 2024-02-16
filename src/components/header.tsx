import Link from "next/link";
import { LinkWithMixpanelTracking } from "./link-with-mixpanel-tracking";

export const Header = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center space-x-4">
        <Link className="blue text-xl font-bold text-blue-600" href="/">
          ✨AERIAL
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link className="text-gray-600 hover:text-gray-800" href="why">
          Why Aerial
        </Link>
        <Link className="text-gray-600 hover:text-gray-800" href="pricing">
          Pricing
        </Link>
        <Link className="text-gray-600 hover:text-gray-800" href="blog">
          Blog
        </Link>
        <Link className="text-gray-600 hover:text-gray-800" href="test-form">
          Test Form
        </Link>
        <LinkWithMixpanelTracking
          className="text-gray-600 hover:text-gray-800"
          href="https://app.staging.aerialops.io/login"
          id="login-button"
        >
          Login
        </LinkWithMixpanelTracking>
        <LinkWithMixpanelTracking
          className="bg-green-500 p-2 text-white"
          href="https://app.staging.aerialops.io"
          id="sign-up-button"
        >
          Sign Up
        </LinkWithMixpanelTracking>
      </div>
    </nav>
  );
};
