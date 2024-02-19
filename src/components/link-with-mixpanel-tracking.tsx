import mixpanel from "mixpanel-browser";
import React from "react";

export const LinkWithMixpanelTracking: React.FC<{
  href: string;
  className: string;
  id: string;
  children: React.ReactNode;
}> = ({ href, className, id, children }) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  // Has to be tracked in an effect, as the element must be in the DOM before Mixpanel can attach the event listener.
  // As a workaround, this has to be wrapped in a `setTimeout` as well. See issue here:
  // https://github.com/mixpanel/mixpanel-js/issues/419#issue-2142437047
  React.useEffect(() => {
    setTimeout(() => {
      if (ref.current === null) return;
      // This method will wait for a success on the Mixpanel log up to 300ms before redirecting the user.
      // This is a better guarantee (compared to `mixpanel.track`) that the event will be tracked,
      // as the user will probably not be redirected before the event is sent.
      // All form submissions should be tracked with the same event name, but identified by their id.
      // This makes it easier to analyze which links are clicked more often, and how many interactions we have in total.
      mixpanel.track_links(ref.current, "Link clicked", {
        href,
        id,
      });
    }, 0);
  }, [href, id]);

  return (
    // Having the `id` be the same as the `id` we send to Mixpanel is a good practice,
    // as it is a way to understand which element was clicked without having to look at the source code.
    <a href={href} className={className} id={id} ref={ref}>
      {children}
    </a>
  );
};
