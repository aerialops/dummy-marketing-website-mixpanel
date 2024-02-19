import mixpanel from "mixpanel-browser";
import React from "react";
import { Background } from "~/components/background";
import { Header } from "~/components/header";

const FormInputs: React.FC = () => {
  return (
    <>
      <div className="mb-4 flex flex-col">
        <label htmlFor="name" className="mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="rounded border border-gray-300 px-2 py-1"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="rounded border border-gray-300 px-2 py-1"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="message" className="mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="rounded border border-gray-300 px-2 py-1"
        />
      </div>
      <div className="flex-grow" />
      <button
        className="rounded-lg bg-blue-500 px-4 py-2 text-white"
        type="submit"
      >
        Submit
      </button>
    </>
  );
};

const FormWithoutRedirect: React.FC = () => {
  const id = "invite-form-without-redirect";
  return (
    <form
      className="flex max-w-2xl flex-grow flex-col rounded-lg bg-white p-6 shadow-lg"
      onSubmit={(event) => {
        // prevent full page reload before we track the event
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());
        mixpanel.track("Form submitted", {
          formEntries,
          id,
        });
      }}
      id={id}
    >
      <FormInputs />
    </form>
  );
};

const FormWithRedirect: React.FC = () => {
  const ref = React.useRef<HTMLFormElement>(null);
  // Has to be tracked in an effect, as the element must be in the DOM before Mixpanel can attach the event listener.
  // As a workaround, this has to be wrapped in a `setTimeout` as well. See issue here:
  // https://github.com/mixpanel/mixpanel-js/issues/419#issue-2142437047
  React.useEffect(() => {
    setTimeout(() => {
      if (ref.current === null) return;
      mixpanel.track_forms(ref.current, "Form submitted", () => {
        if (ref.current === null) return;
        // We use `ref.current` instead of the argument passed to the callback, as the argument is not typed.
        const formData = new FormData(ref.current);
        const formEntries = Object.fromEntries(formData.entries());
        return { formEntries, formId: "invite-form-with-redirect" };
      });
    }, 0);
  }, []);

  return (
    <form
      className="flex max-w-2xl flex-grow flex-col rounded-lg bg-white p-6 shadow-lg"
      ref={ref}
    >
      <FormInputs />
    </form>
  );
};

export default function Page() {
  return (
    <Background>
      <Header />
      <div className="flex flex-grow flex-row">
        <div className="flex flex-grow flex-col items-center justify-center space-y-4 px-8 py-16 text-center">
          <h1 className="text-6xl font-bold leading-tight">No redirect</h1>
          <FormWithoutRedirect />
          <div>
            <p className="mb-80 text-center text-white">
              This form does not redirect on submit.
            </p>
          </div>
        </div>

        <div className="flex flex-grow flex-col items-center justify-center space-y-4 px-8 py-16 text-center">
          <h1 className="text-6xl font-bold leading-tight">Redirect</h1>
          <FormWithRedirect />
          <div>
            <p className="mb-80 text-center text-white">
              This form redirects on submit.
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
}
