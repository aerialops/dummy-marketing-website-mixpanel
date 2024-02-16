import mixpanel from "mixpanel-browser";
import React from "react";

export const LinkWithMixpanelTracking: React.FC<{
  href: string;
  className: string;
  id: string;
  children: React.ReactNode;
}> = ({ href, className, id, children }) => {
  // Has to be tracked in an effect, as the element must be in the DOM before Mixpanel can attach the event listener
  // This method will wait for a success on the Mixpanel log a little bit before redirecting the user.
  React.useEffect(() => {
    mixpanel.track_links(`#${id}`, id);
  });

  return (
    <a href={href} className={className} id={id}>
      {children}
    </a>
  );
};
