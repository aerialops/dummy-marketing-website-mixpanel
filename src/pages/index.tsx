import { Background } from "~/components/background";
import { Header } from "~/components/header";

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
          document infrastructure. (change to test if deploys are working)
        </p>
        <button className="rounded-md bg-green-600 p-2 text-white">
          Schedule a demo
        </button>
      </header>
    </Background>
  );
}
