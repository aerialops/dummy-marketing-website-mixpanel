import mixpanel from "mixpanel-browser";
import { Background } from "~/components/background";
import { Header } from "~/components/header";

const TestForm: React.FC = () => {
  return (
    <form
      className="  flex max-w-2xl flex-grow flex-col rounded-lg bg-white p-6 shadow-lg"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());
        mixpanel.track("Form submitted", {
          formEntries,
        });
      }}
    >
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
    </form>
  );
};

export default function Page() {
  return (
    <Background>
      <Header />
      <header className="flex flex-grow flex-col items-center justify-center space-y-4 px-8 py-16 text-center">
        <h1 className="text-6xl font-bold leading-tight">Test form</h1>
      </header>
      <div className="flex flex-grow items-center justify-center">
        <TestForm />
      </div>
      <div>
        <p className="mb-80 text-center text-white">
          This form is not connected to anything.
        </p>
      </div>
    </Background>
  );
}
